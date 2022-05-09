import { Types } from "mongoose";
import config from "../../config";
import { OrganizationGroup, Role, Entity, DenormalizedOrganizationGroup, DenormalizedRole, DenormalizedEntity } from "../../config/types";
import { organizationGroupModel, roleModel } from "../../infra/repo/models";
import { findOne, find } from "../../infra/repo/repository";
import { getConnectedObject } from "../getConnectedObject";
import { createDenormalizedEntity } from "./createDenormalizedEntity";
import { createDenormalizedRole } from "./createDenormalizedRole";

export const createDenormalizedOrganizationGroup = async (
  organizationGroupId: Types.ObjectId, isCreateConnectedObjects: boolean
): Promise<Partial<DenormalizedOrganizationGroup>> => {
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

  if (!isCreateConnectedObjects) {
    return {
      ...organizationGroup,
      ancestors: ancestorsAndHierarchy.ancestors,
      hierarchy: hierarchyValue,
    };
  }

  const directChildrenGroups: OrganizationGroup[] = await find(organizationGroupModel, { directGroup: organizationGroupId });
  const denormalizedGroups: Partial<DenormalizedOrganizationGroup>[] = await Promise.all(
    directChildrenGroups.map(async (group) => {
      const denormalizedGroup: Partial<DenormalizedOrganizationGroup> = await createDenormalizedOrganizationGroup(group._id, false);
      return denormalizedGroup;
    })
  );

  const directChildrenRoles: Role[] = await find(roleModel, { directGroup: organizationGroupId });
  const denormalizedRoles: Partial<DenormalizedRole>[] = await Promise.all(
    directChildrenRoles.map((role) => createDenormalizedRole(role.roleId))
  );

  const denormalizedEntities: Partial<DenormalizedEntity>[] = await Promise.all(directChildrenRoles.map(async (role: Role) => {
    const roleEntity: Entity = await getConnectedObject(
      role.roleId,
      config.mongo.roleCollectionName,
      config.mongo.entityCollectionName
    )
    const denormalizedEntity: Partial<DenormalizedEntity> = await createDenormalizedEntity(roleEntity._id);
    delete denormalizedEntity.digitalIdentities;
    return denormalizedEntity;
  }));

  return {
    ...organizationGroup,
    ancestors: ancestorsAndHierarchy.ancestors,
    hierarchy: hierarchyValue,
    directChildrenGroups: denormalizedGroups,
    directChildrenRoles: denormalizedRoles,
    directChildrenEntities: denormalizedEntities,
  };
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
