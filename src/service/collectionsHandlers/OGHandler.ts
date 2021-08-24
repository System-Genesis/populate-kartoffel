import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { OrganizationGroup } from "../../config/types";
import regularChangeUpdate from "../regularChangeUpdate";
import { organizationGroupModel, roleModel } from "../../util/repo/models";
import roleHandler from "./roleHandler";
import { find } from "../../util/repo/repository";

const OGCollectionName = config.mongo.organizationGroupCollectionName;

export default async (
  updatedOG: OrganizationGroup,
  connectionUpdate: boolean,
  operationType: string
) => {
  const updatedOGId = updatedOG[collectionsMap.uniqueID[OGCollectionName]];
  await regularChangeUpdate(updatedOGId, OGCollectionName);
  if (operationType == config.operationTypes.update && connectionUpdate) {
    //TODO check what count as connection- in which case to do this
    const groupWithDescendants = await getDescendantsFromGroupId(updatedOGId);
    groupWithDescendants.forEach(async (descendantsObject: Object) => {
      await regularChangeUpdate(descendantsObject['descendants']['id'], OGCollectionName);
      const rolesToUpdate = await find(roleModel, {
        directGroup: descendantsObject['descendants']['id'],
      });
      rolesToUpdate.forEach(async (role) => {
        await roleHandler(role, false, config.operationTypes.update);
      });
    });
  }
};

const getDescendantsFromGroupId = async (groupId: string) => {
  const groupsWithDescendants = await organizationGroupModel
    .aggregate([
      { $match: { id: groupId } },
      {
        $graphLookup: {
          from: config.mongo.organizationGroupCollectionName, //collectionName
          startWith: "$id", //field to start
          connectFromField: "id",
          connectToField: "directGroup",
          as: "descendants",
          depthField: "depth",
        },
      },
      { $unwind: "$descendants" },
      { $sort: { "descendants.depth": -1 } },
      { $project: { "descendants.id": 1} },
    ]);
  return groupsWithDescendants;
};
