import config from "../../config";
import { OrganizationGroup } from "../../config/types";
import regularChangeUpdate from "../regularChangeUpdate";
import { organizationGroupModel, roleModel } from "../../util/repo/models";
import roleHandler from "./roleHandler";
import { find } from "../../util/repo/repository";
import { Types } from "mongoose";

const OGCollectionName = config.mongo.organizationGroupCollectionName;

export default async (
  updatedOG: OrganizationGroup,
  connectionUpdate: boolean,
  operationType: string
) => {
  const updatedOGId = Types.ObjectId(updatedOG._id as unknown as string);
  await regularChangeUpdate(updatedOGId, OGCollectionName);
  if (operationType == config.operationTypes.update && connectionUpdate) {
    //TODO check what count as connection- in which case to do this
    const groupWithDescendants = await getDescendantsFromGroupId(updatedOGId);
    groupWithDescendants.forEach(async (descendantsObject: any) => {
      await regularChangeUpdate(
        descendantsObject.descendants._id,
        OGCollectionName
      );
      const rolesToUpdate = await find(roleModel, {
        directGroup: descendantsObject.descendants._id,
      });
      rolesToUpdate.forEach(async (role) => {
        await roleHandler(role, false, config.operationTypes.update);
      });
    });
  }
};

const getDescendantsFromGroupId = async (groupId: Types.ObjectId) => {
  const groupsWithDescendants = await organizationGroupModel.aggregate([
    { $match: { _id: groupId } },
    {
      $graphLookup: {
        from: config.mongo.organizationGroupCollectionName, //collectionName
        startWith: "$_id", //field to start
        connectFromField: "_id",
        connectToField: "directGroup",
        as: "descendants",
        depthField: "depth",
      },
    },
    { $unwind: "$descendants" },
    { $sort: { "descendants.depth": -1 } },
    { $project: { "descendants._id": 1 } },
  ]);
  return groupsWithDescendants;
};
