import config from "../config";
import collectionsMap from "../config/collectionsMap";
import regularChangeUpdate from "../service/regularChangeUpdate";
import { find } from "./repo/repository";

export const recoveryScript = async () => {
  for (const collectionName of config.recoveryCollectionsArray) {
    await createDenormalizedForCollection(collectionName);
  }
};

const createDenormalizedForCollection = async (collectionName) => {
  const collectionData = await find(
    collectionsMap.modelsMap[collectionName],
    {}
  );
  await collectionData.forEach((dataObject) => {
    regularChangeUpdate(
      dataObject[collectionsMap.uniqueID[collectionName]],
      collectionName
    );
  });
};
