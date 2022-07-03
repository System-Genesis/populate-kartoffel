import { Types } from "mongoose";
import collectionsMap from "../config/collectionsMap";
import createDenormalizedObject from "../util/createDenormalizedObject";
import { create, findOneAndReplace } from "../infra/repo/repository";
import logger from 'logger-genesis';

/**
 * creates the denormalized object for the objectID recieved, and then commiting the update.
 * @param dataObjectId the id of the object that is going to be updated
 * @param collectionName the collection of the change
 */
export default async (dataObjectId: Types.ObjectId, collectionName: string) => {
  if (!dataObjectId) {
    console.error('no object id received')
    return;
  }
  // TODO ELI: error handler
  const denormalizedObject = await createDenormalizedObject[collectionName](dataObjectId as any) as any;
  const filterQuery = {
    [collectionsMap.uniqueID[collectionName]]:
      denormalizedObject[collectionsMap.uniqueID[collectionName]],
  };
  const id = denormalizedObject._id
  delete denormalizedObject._id; //TODO: fix typing
  delete denormalizedObject.updatedAt //TODO: fix typing
  const responseFromDB = await findOneAndReplace(collectionsMap.denormalizedModelsMap[collectionName], filterQuery, denormalizedObject)
  if (!responseFromDB) {
    denormalizedObject._id = id;
    await create(collectionsMap.denormalizedModelsMap[collectionName], denormalizedObject)
  }
  // console.log(`the change has completed in ${collectionName} collection:`, JSON.stringify(denormalizedObject))
  logger.info(true, 'APP', `Change has completed in ${collectionName}`, JSON.stringify(denormalizedObject));
};
