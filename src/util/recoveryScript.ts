import config from "../config";
import collectionsMap from "../config/collectionsMap";
import regularChangeUpdate from "../service/regularChangeUpdate";
import { find } from "../infra/repo/repository";
import logger from 'logger-genesis';

export const recoveryScript = async () => {
  for (const collectionName of config.recoveryCollectionsArray) {
    await createDenormalizedForCollection(collectionName);
  }
};

const createDenormalizedForCollection = async (collectionName) => {
  // console.log(`running recovery script on - ${collectionName}`);
  logger.info(true, 'APP', 'Recovery is starting', `Recovery on collection: ${collectionName} is starting`);
  const collectionData = await find(
    collectionsMap.modelsMap[collectionName],
    {}
  );
  await callFunctionOnEachArrayElementInBatches(collectionName, collectionData);
  // console.log(`recovery is finished for - ${collectionName}`);
  logger.info(true, 'APP', 'Recovery done', `Recovery on collection: ${collectionName} has done`);
};

const callFunctionOnEachArrayElementInBatches = async (
  collectionName,
  collectionData
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
