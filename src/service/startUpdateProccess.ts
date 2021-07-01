import config from "../config";
import { MyChangeEvent } from "../config/types";
import extractChangeEventObjectType from "../util/extractChangeEventObjectType";
import getEntity from "../util/getEntity";
import regularChangeUpdate from "./regularChangeUpdate";
import connectionChangeUpdate from "./connectionChangeUpdate";

const { mongo } = config;

const ignoreUpdateQuery = (collection: string, operationType: String) =>
  operationType == "inesrt" &&
  collection ==
    (mongo.roleCollectionName || mongo.digitalIdentityCollectionName);

const updateObjectsDependencyQuery = (
  changeEventObject: MyChangeEvent,
  collection: string,
  operationType: String
) => {
  if (operationType == "update") {
    const updatedFields =
      changeEventObject.description.updateDescription.updatedFields;
    for (const key in updatedFields) {
      if (ObjectCconnectionFields[collection] == updatedFields[key])
        return true;
    }
    return false;
  } else return false;
};

const ObjectCconnectionFields = {
  [mongo.digitalIdentityCollectionName]: "entityId",
  [mongo.entityCollectionName]: [],
  [mongo.roleCollectionName]: "digitalIndentityUniqueId",
};

export default async (changeEventObject: MyChangeEvent) => {
  const collection = extractChangeEventObjectType(changeEventObject);
  const operationType = changeEventObject.description.operationType;
  if (ignoreUpdateQuery(collection, operationType)) null;
  else {
    const entity = await getEntity(changeEventObject);
    if (
      updateObjectsDependencyQuery(changeEventObject, collection, operationType)
    ) {
      connectionChangeUpdate(entity, config.uniqueID[collection]);
    } else regularChangeUpdate(entity);
  }
};
