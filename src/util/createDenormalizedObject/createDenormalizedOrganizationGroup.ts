import config from "../../config";
import { DenormalizedOrganizationGroup } from "../../config/types";
import { organizationGroupModel } from "../repo/models";
import { findOne } from "../repo/repository";

export const createDenormalizedOrganizationGroup = async (
  organizationGroupId: string
) => {
  const organizationGroup = await findOne(organizationGroupModel, {
    id: organizationGroupId,
  });
  const ancestorsObjectsArray = await getAncestorsFromGroupId(
    organizationGroupId
  );
  const ancestorsAndHierarchy: { ancestors: string[]; hierarchy: string[] } = {
    ancestors: [],
    hierarchy: [],
  };
  ancestorsObjectsArray.ancestors.forEach((ancestorsObject) => {
    ancestorsAndHierarchy.ancestors.push(ancestorsObject.id);
    ancestorsAndHierarchy.hierarchy.push(ancestorsObject.name);
  });

  const hierarchyValue = ancestorsAndHierarchy.hierarchy.join("/");
  return {
    ...organizationGroup,
    ancestors: ancestorsAndHierarchy.ancestors,
    hierarchy: hierarchyValue,
  } as unknown as DenormalizedOrganizationGroup;
};
const getAncestorsFromGroupId = async (groupId: string) => {
  const groupsWithAncestors = await organizationGroupModel.aggregate([
    { $match: { id: groupId } },
    {
      $graphLookup: {
        from: config.mongo.organizationGroupCollectionName,
        startWith: "$directGroup",
        connectFromField: "directGroup",
        connectToField: "id",
        as: "ancestors",
      },
    },
    { $project: { 'ancestors.id': 1, 'ancestors.name': 1 } },
  ]).exec();
  return groupsWithAncestors[0];
};
