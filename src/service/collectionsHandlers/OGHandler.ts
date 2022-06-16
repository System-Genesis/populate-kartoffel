import config from "../../config";
import { OrganizationGroup } from "../../config/types";
import regularChangeUpdate from "../regularChangeUpdate";
import { organizationGroupModel, roleModel } from "../../infra/repo/models";
import roleHandler from "./roleHandler";
import { find } from "../../infra/repo/repository";
import { Types } from "mongoose";
import logger from 'logger-genesis';

const OGCollectionName = config.mongo.organizationGroupCollectionName;

export default async (
  updatedOG: OrganizationGroup,
  connectionUpdate: boolean,
  operationType: string
) => {
  if (!updatedOG) {
    // console.log(`trying to access to 'OrganizationGroup' that doesn't exist`)
    logger.warn(false, 'APP', `trying to access to 'OrganizationGroup' that doesn't exist`,
      `trying to access to 'OrganizationGroup' that doesn't exist`);
  } else {
    const updatedOGId = Types.ObjectId(updatedOG._id as unknown as string);
    if (operationType == config.operationTypes.update && connectionUpdate) {
      //TODO check what count as connection- in which case to do this
      //done
      await updateDescendantsRoles(updatedOGId);

      const groupWithDescendants = await getDescendantsFromGroupId(updatedOGId);
      groupWithDescendants.forEach(async (descendantsObject: any) => {
        await regularChangeUpdate(
          descendantsObject.descendants._id,
          OGCollectionName
        );
        await updateDescendantsRoles(descendantsObject.descendants._id);
      });
    }
    await regularChangeUpdate(updatedOGId, OGCollectionName);
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

async function updateDescendantsRoles(groupId: Types.ObjectId) {
  const rolesToUpdate = await find(roleModel, {
    directGroup: groupId,
  });
  rolesToUpdate.forEach(async (role) => {
    await roleHandler(role, true, config.operationTypes.update);
  });
}

