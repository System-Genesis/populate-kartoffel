import config from "../config";
import { MyChangeEvent } from "../config/types";
import extractChangeEventObjectType from "../util/extractChangeEventObjectType";
import getEntity from "../util/getEntity";
import regularChangeUpdate from "./regularChangeUpdate";
import connectionChangeUpdate from "./connectionChangeUpdate";

const { mongo } = config;

const ignoreUpdateQuery = (changeEventObject: MyChangeEvent, collection: string) =>
  changeEventObject.description.operationType == "inesrt" &&
  collection ==
    (mongo.roleCollectionName ||
      mongo.digitalIdentityCollectionName);

const updateObjectsDependencyQuery = (changeEventObject: MyChangeEvent, collection: string) => {
  const updatedFields = changeEventObject.description.updateDescription.updatedFields;
  if(changeEventObject.description.operationType == "update" ){
    for (const key in updatedFields) {
      if(ObjectCconnectionFields[collection] == updatedFields[key])
        return true
    }
    return false
  }
  else return false
};

const ObjectCconnectionFields = {
  [mongo.digitalIdentityCollectionName]: 'entityId',
  [mongo.entityCollectionName]: [],
  [mongo.roleCollectionName]: 'digitalIndentityUniqueId',
};


export default async (changeEventObject: MyChangeEvent) => {
  const collection = extractChangeEventObjectType(changeEventObject)
  if (ignoreUpdateQuery(changeEventObject, collection)) null;
  else {
    const entity = await getEntity(changeEventObject);
    if(updateObjectsDependencyQuery(changeEventObject, collection)){
      connectionChangeUpdate(entity, config.uniqueID[collection]);
    }
    else regularChangeUpdate(entity);
  }
};

