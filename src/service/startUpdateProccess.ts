import config from "../config";
import { MyChangeEvent } from "../config/types";
import extractChangeEventObjectType from "../util/extractChangeEventObjectType";
import { getEntityFromChangeEvent } from "../util/getEntity";
import regularChangeUpdate from "./regularChangeUpdate";
import connectionChangeUpdate from "./connectionChangeUpdate";

const { mongo } = config;

const ignoreUpdateQuery = (collection: string, operationType: string) =>
  !config.operationTypes[operationType] ||
  (operationType == config.operationTypes.insert &&
    collection ==
      (mongo.roleCollectionName || mongo.digitalIdentityCollectionName));

const updateObjectsDependencyQuery = (
  changeEventObject: MyChangeEvent,
  collection: string,
  operationType: String
) => {
  if (operationType == config.operationTypes.update) {
    const updatedFields =
      changeEventObject.description.updateDescription.updatedFields;
    for (const key in updatedFields) {
      if (ObjectCconnectionFields[collection] == key) return true;
    }
    return false;
  } else return false;
};

const ObjectCconnectionFields = {
  [mongo.digitalIdentityCollectionName]: "entityId",
  [mongo.entityCollectionName]: [],
  [mongo.roleCollectionName]: "digitalIdentityUniqueId",
};

export default async (changeEventObject: MyChangeEvent) => {
  const operationType = changeEventObject.description.operationType as string;
  const collection = config.operationTypes[operationType]
    ? extractChangeEventObjectType(changeEventObject)
    : "";
  if (ignoreUpdateQuery(collection, operationType)) null;
  else {
    const entity = await getEntityFromChangeEvent(changeEventObject);
    if (!entity) {
      console.error(
        "the entity that matches this change does not exist in the DB:",
        changeEventObject.description.fullDocument
      );
    } else {
      if (
        updateObjectsDependencyQuery(
          changeEventObject,
          collection,
          operationType
        )
      ) {
        await connectionChangeUpdate(
          entity,
          collection,
          changeEventObject.description.fullDocument[
            config.uniqueID[collection]
          ]
        );
      } else await regularChangeUpdate(entity);
    }
  }
};
