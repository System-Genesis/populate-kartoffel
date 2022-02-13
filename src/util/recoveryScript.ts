import config from "../config";
import collectionsMap from "../config/collectionsMap";
import regularChangeUpdate from "../service/regularChangeUpdate";
import { find } from "../infra/repo/repository";

/**
 * go over all the writeDB and updates the readDB for each one
 * it is going one by one on an array from the .ENV file called "RECOVERY_COLLECTIONS_ARRAY"
 */
export const recoveryScript = async () => {
  for (const collectionName of config.recoveryCollectionsArray) {
    await createDenormalizedForCollection(collectionName);
  }
};

/**
 * updates a collections
 * @param collectionName the collection that is going to be updated
 */
const createDenormalizedForCollection = async (collectionName) => {
  console.log(`running recovery script on - ${collectionName}`);
  const collectionData = await find(
    collectionsMap.modelsMap[collectionName],
    {}
  );
  await callFunctionOnEachArrayElementInBatches(collectionName, collectionData);
  console.log(`recovery is finished for -${collectionName}`);
};

/**
 * 
 * @param collectionName the collection that we are going to update
 * @param collectionData the ids array that we are going to update
 */
const callFunctionOnEachArrayElementInBatches = async (
  collectionName: string,
  collectionData: Array<Object>
) => {
  const chunkSize = config.prefetchAmount;
  while (collectionData.length > 0) {
    const batch = collectionData.splice(0, chunkSize);
    await Promise.all(
      batch.map(async (dataObject) => {
        await regularChangeUpdate(
          dataObject[collectionsMap.uniqueID[collectionName]],
          collectionName
        );
      })
    );
  }
};
