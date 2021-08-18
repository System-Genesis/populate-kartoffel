import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { findOne } from "../repo/repository";
import { digitalIdentityGetOptions } from "./getDigitalIdentity";
import { entityGetOptions } from "./getEntity";
import { roleGetOptions } from "./getRole";

export const getConnectedObject = async (
  currentObjectId: string,
  currentCollectionName: string,
  connectedObjectCollctionName: string
) => {
  const query = {
    [collectionsMap.uniqueID[currentCollectionName]]: currentObjectId,
  };

  const currentObject = await findOne(
    collectionsMap.modelsMap[currentCollectionName],
    query
  );
  const connectedObject = await connectedObjectMap[
    connectedObjectCollctionName
  ][currentCollectionName](currentObject); //TODO think maybe use if else and divide the functions

  return connectedObject;
};

const connectedObjectMap = {
  [config.mongo.digitalIdentityCollectionName]: digitalIdentityGetOptions,
  [config.mongo.entityCollectionName]: entityGetOptions,
  [config.mongo.roleCollectionName]: roleGetOptions,
  // [config.mongo.organizationGroupCollectionName]: , //TODO
};
