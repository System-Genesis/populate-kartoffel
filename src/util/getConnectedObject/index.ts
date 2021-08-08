import config, { collectionsMap } from "../../config";
import { findOne } from "../repo/repository";
import { digitalIdentityGetOptions } from "./getDigitalIdentity";
import { entityGetOptions } from "./getEntity";
import { roleGetOptions } from "./getRole";

export const getConnectedObject = async (currentObjectId: string, currentCollectionName: string, connectedObjectCollctionName: string) => {
  const query = {[collectionsMap.uniqueID[currentCollectionName]]: currentObjectId}
  const currentObject = await findOne(collectionsMap.modelsMap[currentCollectionName], query)
  return connectedObjectMap[connectedObjectCollctionName](currentObject);

};

const connectedObjectMap = {
  [config.mongo.digitalIdentityCollectionName]: digitalIdentityGetOptions,
  [config.mongo.entityCollectionName]: entityGetOptions,
  [config.mongo.roleCollectionName]: roleGetOptions,
  // [config.mongo.organizationGroupCollectionName]: , //TODO
}
