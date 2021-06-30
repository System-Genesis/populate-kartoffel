import { Entity } from "../config/types";
import compareAndUpdate from "../util/repo/findAndUpdate";
import craeteDenormalizedEntity from "../util/craeteDenormalizedEntity";

export default async (entity: Entity, id: string) => {
    const denormalizedEntity = await craeteDenormalizedEntity(entity);
    await compareAndUpdate(denormalizedEntity);
  };