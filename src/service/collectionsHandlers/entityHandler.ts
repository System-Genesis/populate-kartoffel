import regularChangeUpdate from "../regularChangeUpdate";
import config, { collectionsMap } from "../../config/index";
import { Entity } from "../../config/types";

const entityCollectionName = config.mongo.entityCollectionName;

export default async (updetedEntity: Entity) => {
  const updatedEntityId = updetedEntity[collectionsMap.uniqueID[entityCollectionName]]
  await regularChangeUpdate(updatedEntityId, entityCollectionName);
};
