import { Types } from "mongoose";
import config from "../../config";
import { OrganizationGroup, Role, Entity, DenormalizedOrganizationGroup, DenormalizedRole, DenormalizedEntity } from "../../config/types";
import { entityModel, organizationGroupModel, roleModel } from "../../infra/repo/models";
import { findOne, find } from "../../infra/repo/repository";
import { createDenormalizedEntity } from "./createDenormalizedEntity";
import { createDenormalizedRole } from "./createDenormalizedRole";

export const createDenormalizedOrganizationGroup = async (
  organizationGroupId: Types.ObjectId
): Promise<DenormalizedOrganizationGroup> => {
  const organizationGroup: OrganizationGroup = await findOne(organizationGroupModel, {
    _id: organizationGroupId,
  });
  if (organizationGroup.childrenNames) delete organizationGroup.childrenNames;
  const ancestorsObjectsArray = await getAncestorsFromGroupId(
    organizationGroupId
  );
  const ancestorsAndHierarchy: { ancestors: string[]; hierarchy: string[] } = {
    ancestors: [],
    hierarchy: [],
  };
  ancestorsObjectsArray.forEach((ancestorsObject) => {
    ancestorsAndHierarchy.ancestors.unshift(ancestorsObject.ancestors._id);
    ancestorsAndHierarchy.hierarchy.push(ancestorsObject.ancestors.name);
  });

  const hierarchyValue = ancestorsAndHierarchy.hierarchy.join("/");

  const directChildrenGroups: OrganizationGroup[] = await find(organizationGroupModel, { directGroup: organizationGroupId });
  const denormalizedGroups: Partial<DenormalizedOrganizationGroup>[] = await Promise.all(
    directChildrenGroups.map(async (group) => {
      const denormalizedGroup: DenormalizedOrganizationGroup = await createDenormalizedOrganizationGroup(group._id);
      delete denormalizedGroup.directChildrenEntities;
      delete denormalizedGroup.directChildrenGroups;
      delete denormalizedGroup.directChildrenRoles;
      return denormalizedGroup;
    })
  );

  const directChildrenEntities: Entity[] = await find(entityModel, { directGroup: organizationGroupId });
  const denormalizedEntities: Partial<DenormalizedEntity>[] = await Promise.all(
    directChildrenEntities.map(async (entity) => {
      const denormalizedEntity: Partial<DenormalizedEntity> = await createDenormalizedEntity(entity._id)
      delete denormalizedEntity.digitalIdentities;
      return denormalizedEntity;
    })
  );

  const directChildrenRoles: Role[] = await find(roleModel, { directGroup: organizationGroupId });
  const denormalizedRoles: Partial<DenormalizedRole>[] = await Promise.all(
    directChildrenRoles.map((role) => createDenormalizedRole(role.roleId))
  );

  return {
    ...organizationGroup,
    ancestors: ancestorsAndHierarchy.ancestors,
    hierarchy: hierarchyValue,
    directChildrenGroups: denormalizedGroups,
    directChildrenRoles: denormalizedRoles,
    directChildrenEntities: denormalizedEntities,
  } as unknown as DenormalizedOrganizationGroup;
};
const getAncestorsFromGroupId = async (groupId: Types.ObjectId) => {
  const groupsWithAncestors = await organizationGroupModel.aggregate([
    { $match: { _id: groupId } },
    {
      $graphLookup: {
        from: config.mongo.organizationGroupCollectionName,
        startWith: "$directGroup",
        connectFromField: "directGroup",
        connectToField: "_id",
        as: "ancestors",
        depthField: "depth",
      },
    },
    { $unwind: "$ancestors" },
    { $sort: { "ancestors.depth": -1 } },
    { $project: { "ancestors._id": 1, "ancestors.name": 1 } },
  ]);
  return groupsWithAncestors;
};
