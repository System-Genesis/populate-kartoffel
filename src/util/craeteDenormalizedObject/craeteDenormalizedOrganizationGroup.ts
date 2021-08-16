import config from "../../config";
import { OrganizationGroup, DenormalizedOrganizationGroup } from "../../config/types";
import { organizationGroupModel } from "../repo/models";
import { findOne } from "../repo/repository";


export const craeteDenormalizedOrganizationGroup = async (
  organizationGroupId: string
) => {
  const organizationGroup = await findOne(organizationGroupModel, { id: organizationGroupId });
  const ancestorsObject = getAncestorsFromGroupId(
    organizationGroupId as unknown as string
  );
  const ancestorsAndHierarchy = ancestorsObject["ancestors"].reduce(
    (resultObject, ancestorsObject) => {
      resultObject.ancestors.push(ancestorsObject.id);
      resultObject.hierarchy.push(ancestorsObject.name);
      return resultObject;
    }
  );
  const hierarchyValue = ancestorsAndHierarchy.hierarchy.join("/");
  return {
    ...organizationGroup,
    ancestors: ancestorsAndHierarchy.ancestors,
    hierarchy: hierarchyValue,
  } as unknown as DenormalizedOrganizationGroup;
};
const getAncestorsFromGroupId = async (groupId: string) => {
  const groupsWithAncestors = await organizationGroupModel
    .aggregate([
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
      { $unwind: "$ancestors" },
      { $project: { _id: 1, name: 1 } },
    ])
    .exec();
  return groupsWithAncestors;
};
