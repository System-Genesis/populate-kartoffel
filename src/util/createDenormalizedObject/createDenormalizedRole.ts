import config from "../../config";
import { DenormalizedEntity, DenormalizedOrganizationGroup, DenormalizedRole } from "../../config/types";
import { getConnectedObject } from "../getConnectedObject";
import { organizationGroupModel, roleModel } from "../../infra/repo/models";
import { findOne } from "../../infra/repo/repository";
import { createDenormalizedOrganizationGroup } from "./createDenormalizedOrganizationGroup";

const validJobTitle = (jobTitle: string): boolean => {
  return !!jobTitle && jobTitle !== 'unknown';
}

export const createDenormalizedRole = async (roleId: string) => {
  const role = await findOne(roleModel, { roleId: roleId });
  const findOGquery = { _id: role.directGroup };
  const organizationGroup = await findOne(organizationGroupModel, findOGquery);
  if (!organizationGroup) {
    return role as DenormalizedRole;
  } else {
    const denormalizedOrganizationGroup: DenormalizedOrganizationGroup =
      await createDenormalizedOrganizationGroup(organizationGroup._id);
    const roleEntity: DenormalizedEntity = await getConnectedObject(
      roleId,
      config.mongo.roleCollectionName,
      config.mongo.entityCollectionName
    );

    const hierarchyNames: string =
      (denormalizedOrganizationGroup.hierarchy
        ? denormalizedOrganizationGroup.hierarchy + "/"
        : "") +
      (denormalizedOrganizationGroup.name
        ? denormalizedOrganizationGroup.name
        : "");

    // const displayNameValue = roleEntity
    //   ? hierarchyNames +
    //   "/" +
    //   role.jobTitle +
    //   " - " +
    //   roleEntity.firstName +
    //   " " +
    //   roleEntity.lastName
    //   : hierarchyNames;


    const displayNameValue = roleEntity ? `${hierarchyNames}/${validJobTitle(role.jobTitle) ?
      `${role.jobTitle} - ${roleEntity.fullName}` : `${roleEntity.fullName}`}` : hierarchyNames;

    const hierarchyValue = hierarchyNames;
    const hierarchyIdsValue = [role.directGroup].concat(
      denormalizedOrganizationGroup.ancestors
    );
    return {
      ...role,
      displayName: displayNameValue,
      hierarchy: hierarchyValue,
      hierarchyIds: hierarchyIdsValue,
    } as unknown as DenormalizedRole;
  }
};
