import regularChangeUpdate from "../regularChangeUpdate";
import config from "../../config/index";
import collectionsMap from "../../config/collectionsMap";
import { Entity } from "../../config/types";

const entityCollectionName = config.mongo.entityCollectionName;

export default async (updetedEntity: Entity) => {
  if (updetedEntity) {
    const updatedEntityId = updetedEntity[collectionsMap.uniqueID[entityCollectionName]]
    await regularChangeUpdate(updatedEntityId, entityCollectionName);
  }
};
