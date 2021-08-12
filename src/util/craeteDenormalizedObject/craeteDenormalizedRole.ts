import config from "../../config";
import { Role, DenormalizedRole } from "../../config/types";
import { getConnectedObject } from "../getConnectedObject";
import { organizationGroupModel } from "../repo/models";
import { findOne } from "../repo/repository";
import { craeteDenormalizedOrganizationGroup } from "./craeteDenormalizedOrganizationGroup";

export const craeteDenormalizedRole = async (role: Role) => {
  const findOGquery = { id: role.directGroup };
  const organizationGroup = await findOne(organizationGroupModel, findOGquery);
  const denormalizedOrganizationGroup = await craeteDenormalizedOrganizationGroup(organizationGroup);
  const roleEntity = await getConnectedObject(
    role.roleId,
    config.mongo.roleCollectionName,
    config.mongo.entityCollectionName
  );

  const displayNameValue = roleEntity
    ? denormalizedOrganizationGroup.hierarchy +
    "/" +
    role.jobTitle +
    "- " +
    roleEntity.firstName +
    " " +
    roleEntity.lastName
    : denormalizedOrganizationGroup.hierarchy + "/" + role.jobTitle;
  const hierarchyValue = denormalizedOrganizationGroup.hierarchy;
  const hierarchyIdsValue = role.directGroup + denormalizedOrganizationGroup.ancestors;
  return {
    ...role,
    displayName: displayNameValue,
    hierarchy: hierarchyValue,
    hierarchyIds: hierarchyIdsValue,
  } as unknown as DenormalizedRole;
};
