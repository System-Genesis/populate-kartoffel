import config from "../config";
import { MyChangeEvent } from "../config/types";
import getCollectionName from "../util/getCollectionName";
import { getEntityFromChangeEvent } from "../util/getEntity";
import regularChangeUpdate from "./regularChangeUpdate";
import connectionChangeUpdate from "./connectionChangeUpdate";

const { mongo } = config;

const isIgnoreChangeQuery = (collectionName: string, operationType: string) =>
  !config.operationTypes[operationType] ||
  (operationType == config.operationTypes.insert &&
    collectionName ==
      (mongo.roleCollectionName || mongo.digitalIdentityCollectionName));

const isDependencyFieldChangedQuery = (
  changeEventObject: MyChangeEvent,
  collectionName: string,
  operationType: String
) => {
  if (operationType == config.operationTypes.update) {
    const updatedFields =
      changeEventObject.description.updateDescription.updatedFields;
    for (const key in updatedFields) {
      if (
        ObjectCconnectionFields[collectionName] &&
        ObjectCconnectionFields[collectionName] == key
      )
        return true;
    }
    return false;
  } else return false;
};

const ObjectCconnectionFields = {
  [mongo.digitalIdentityCollectionName]: "entityId",
  [mongo.entityCollectionName]: null,
  [mongo.roleCollectionName]: "digitalIdentityUniqueId",
};

export default async (changeEventObject: MyChangeEvent) => {
  const operationType = changeEventObject.description.operationType as string;
  const collectionName = getCollectionName(changeEventObject);

  if (!isIgnoreChangeQuery(collectionName, operationType)) {
    const entity = await getEntityFromChangeEvent(changeEventObject);
    if (!entity) {
      console.error(
        "the entity that matches this change does not exist in the DB:",
        changeEventObject.description.fullDocument
      );
    } else {
      if (
        isDependencyFieldChangedQuery(
          changeEventObject,
          collectionName,
          operationType
        )
      ) {
        await connectionChangeUpdate(
          entity,
          collectionName,
          changeEventObject.description.fullDocument[
            config.uniqueID[collectionName]
          ]
        );
      } else await regularChangeUpdate(entity);
    }
  }
};
