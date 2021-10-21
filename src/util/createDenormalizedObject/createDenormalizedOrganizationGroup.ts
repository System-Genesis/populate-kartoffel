import { Types } from "mongoose";
import config from "../../config";
import { DenormalizedOrganizationGroup } from "../../config/types";
import { organizationGroupModel } from "../../infra/repo/models";
import { findOne } from "../../infra/repo/repository";

export const createDenormalizedOrganizationGroup = async (
  organizationGroupId: Types.ObjectId
) => {
  const organizationGroup = await findOne(organizationGroupModel, {
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
  return {
    ...organizationGroup,
    ancestors: ancestorsAndHierarchy.ancestors,
    hierarchy: hierarchyValue,
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
