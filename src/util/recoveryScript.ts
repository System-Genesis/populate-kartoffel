import config from "../config";
import collectionsMap from "../config/collectionsMap";
import regularChangeUpdate from "../service/regularChangeUpdate";
import { find } from "../infra/repo/repository";

export const recoveryScript = async () => {
  for (const collectionName of config.recoveryCollectionsArray) {
    await createDenormalizedForCollection(collectionName);
  }
};

const createDenormalizedForCollection = async (collectionName) => {
  console.log(`running recovery script on - ${collectionName}`);
  const collectionData = await find(
    collectionsMap.modelsMap[collectionName],
    {}
  );
  await Promise.all(collectionData.map(async (dataObject) => {
    await regularChangeUpdate(
      dataObject[collectionsMap.uniqueID[collectionName]],
      collectionName
    );
  }, 
  console.log(`recovery is finished for -${collectionName}`)));
};
