import { Entity } from "../config/types";
import craeteDenormalizedEntity from "../util/craeteDenormalizedEntity";
import { findOne } from "../util/repo/repository";
import { entityModel } from "../util/repo/models";
import insertTwoEntitysWithTransaction from "../util/insertTwoEntitysWithTransaction";
import transactions from "../util/repo/transactions";

export default async (destinationEntity: Entity, sourceEntityId: string) => {
  const sourceEntityIdFindOneQuery = {id: sourceEntityId}
  const sourceEntity = await findOne(entityModel, sourceEntityIdFindOneQuery) as Entity
  
  const sourceDenormalizedEntity = await craeteDenormalizedEntity(sourceEntity);
  const destinationDenormalizedEntity = await craeteDenormalizedEntity(destinationEntity);

  await transactions(insertTwoEntitysWithTransaction(sourceDenormalizedEntity, destinationDenormalizedEntity));
};
