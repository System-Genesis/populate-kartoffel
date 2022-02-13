import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { findOne } from "../../infra/repo/repository";
import { digitalIdentityGetOptions } from "./getDigitalIdentity";
import { entityGetOptions } from "./getEntity";
import { roleGetOptions } from "./getRole";

/**
 * finds the connected object of the recieved id, in the collection recieved
 * @param currentObjectId the id of the current object
 * @param currentCollectionName the collection name of the current object
 * @param connectedObjectCollectionName the collection name of the connected object that we want to find 
 * @returns the object connected to the recieved id
 */
export const getConnectedObject = async (
  currentObjectId: string,
  currentCollectionName: string,
  connectedObjectCollectionName: string
) => {
  const query = {
    [collectionsMap.uniqueID[currentCollectionName]]: currentObjectId,
  };

  const currentObject = await findOne(
    collectionsMap.modelsMap[currentCollectionName],
    query
  );
  const connectedObject = await connectedObjectMap[
    connectedObjectCollectionName
  ][currentCollectionName](currentObject); 
  return connectedObject;
};

const connectedObjectMap = {
  [config.mongo.digitalIdentityCollectionName]: digitalIdentityGetOptions,
  [config.mongo.entityCollectionName]: entityGetOptions,
  [config.mongo.roleCollectionName]: roleGetOptions,
  // [config.mongo.organizationGroupCollectionName]: , //TODO
};
