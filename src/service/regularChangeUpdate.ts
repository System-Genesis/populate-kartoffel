import { Entity } from "../config/types";
import craeteDenormalizedEntity from "../util/craeteDenormalizedEntity";
import { denormalizedEntityModel } from "../util/repo/models";
import { findOneAndReplace } from "../util/repo/repository";

export default async (entity: Entity) => {
  const denormalizedEntity = await craeteDenormalizedEntity(entity);
  const filterQuery = {id: entity.id};
  await findOneAndReplace(denormalizedEntityModel, filterQuery, denormalizedEntity);
};
