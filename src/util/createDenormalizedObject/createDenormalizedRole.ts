import config from "../../config";
import { DenormalizedRole } from "../../config/types";
import { getConnectedObject } from "../getConnectedObject";
import { organizationGroupModel, roleModel } from "../repo/models";
import { findOne } from "../repo/repository";
import { createDenormalizedOrganizationGroup } from "./createDenormalizedOrganizationGroup";

export const createDenormalizedRole = async (roleId: string) => {
  const role = await findOne(roleModel, { roleId: roleId });
  const findOGquery = { _id: role.directGroup };
  const organizationGroup = await findOne(organizationGroupModel, findOGquery);
  if (!organizationGroup) {
    return role as DenormalizedRole;
  } else {
    const denormalizedOrganizationGroup =
      await createDenormalizedOrganizationGroup(organizationGroup._id);
    const roleEntity = await getConnectedObject(
      roleId,
      config.mongo.roleCollectionName,
      config.mongo.entityCollectionName
    );

    const hierarchyNames =
      (denormalizedOrganizationGroup.hierarchy
        ? denormalizedOrganizationGroup.hierarchy + "/"
        : "") +
      (denormalizedOrganizationGroup.name
        ? denormalizedOrganizationGroup.name
        : "");

    const displayNameValue = roleEntity
      ? hierarchyNames +
        "/" +
        role.jobTitle +
        "- " +
        roleEntity.firstName +
        " " +
        roleEntity.lastName
      : hierarchyNames;
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
