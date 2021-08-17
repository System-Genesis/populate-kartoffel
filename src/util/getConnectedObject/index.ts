import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { DigitalIdentity, Entity, Role } from "../../config/types";
import { findOne } from "../repo/repository";
import { digitalIdentityGetOptions } from "./getDigitalIdentity";
import { entityGetOptions } from "./getEntity";
import { roleGetOptions } from "./getRole";

export const getConnectedObject = async (
  currentObject: Role | DigitalIdentity | Entity,
  currentCollectionName: string,
  connectedObjectCollctionName: string
) => {
  const query = {
    [collectionsMap.uniqueID[currentCollectionName]]: currentObject[collectionsMap.uniqueID[currentCollectionName]],
  };
  const connectedObject = await connectedObjectMap[
    connectedObjectCollctionName
  ][currentCollectionName](currentObject as any); //TODO think maybe use if else and divide the functions
  if (!connectedObject) {
    const DenormalizedObject = await findOne(
      collectionsMap.denormalizedModelsMap[currentCollectionName],
      query
    );
    return await connectedObjectMap[connectedObjectCollctionName][
      currentCollectionName
    ](DenormalizedObject);
  } else return connectedObject;
};

const connectedObjectMap = {
  [config.mongo.digitalIdentityCollectionName]: digitalIdentityGetOptions,
  [config.mongo.entityCollectionName]: entityGetOptions,
  [config.mongo.roleCollectionName]: roleGetOptions,
  // [config.mongo.organizationGroupCollectionName]: , //TODO
};
