import { Entity } from "../config/types";
import findAndUpdate from "../util/repo/findAndUpdate";
import craeteDenormalizedEntity from "../util/craeteDenormalizedEntity";

export default async (entity: Entity) => {
    const denormalizedEntity = await craeteDenormalizedEntity(entity);
    await findAndUpdate(denormalizedEntity);
  };