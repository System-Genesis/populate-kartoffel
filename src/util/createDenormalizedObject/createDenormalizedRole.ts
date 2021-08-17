import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { DenormalizedRole } from "../../config/types";
import { getConnectedObject } from "../getConnectedObject";
import { organizationGroupModel, roleModel } from "../repo/models";
import { findOne } from "../repo/repository";
import { createDenormalizedOrganizationGroup } from "./createDenormalizedOrganizationGroup";

const OGCollectionName = config.mongo.organizationGroupCollectionName;

export const createDenormalizedRole = async (roleId: string) => {
  const role = await findOne(roleModel, { roleId: roleId });
  const findOGquery = { id: role.directGroup };
  const organizationGroup = await findOne(organizationGroupModel, findOGquery);
  const denormalizedOrganizationGroup = await createDenormalizedOrganizationGroup(organizationGroup[collectionsMap.uniqueID[OGCollectionName]]);
  const roleEntity = await getConnectedObject(
    role,
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
