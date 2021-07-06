import { Entity } from "../config/types";
import craeteDenormalizedEntity from "../util/craeteDenormalizedEntity";
import { denormalizedEntityModel } from "../util/repo/models";
import { create, findOneAndUpdate } from "../util/repo/repository";

export default async (entity: Entity) => {
  const denormalizedEntity = await craeteDenormalizedEntity(entity);
  const filterQuery = {id: denormalizedEntity.id};
  const responseFromDB = await findOneAndUpdate(denormalizedEntityModel, filterQuery, denormalizedEntity)
  if(responseFromDB == null) await create(denormalizedEntityModel, denormalizedEntity)
  console.log('the change has completed:', JSON.stringify(denormalizedEntity))
};
