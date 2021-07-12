import { Entity } from "../config/types";
import craeteDenormalizedEntity from "../util/craeteDenormalizedEntity";
import { findOne, findOneAndUpdate } from "../util/repo/repository";
import { denormalizedEntityModel } from "../util/repo/models";
import config from "../config";
import { getEntityOptions } from "../util/getEntity";
import regularChangeUpdate from "./regularChangeUpdate";

export default async (destinationEntity: Entity, collection: string, sourceChangedObjectId: string) => {
  const sourceEntityIdFindOneQuery = {[config.uniqueIDPath[collection]]: sourceChangedObjectId}
  const sourceDenormalizedEntityBeforeChange = await findOne(denormalizedEntityModel, sourceEntityIdFindOneQuery)
  const sourceEntity = await getEntityOptions[config.mongo.denormalizedEntityCollectionName](sourceDenormalizedEntityBeforeChange as any);

  if(!sourceEntity){
    regularChangeUpdate(destinationEntity)
  }else{
    const sourceDenormalizedEntity = await craeteDenormalizedEntity(sourceEntity);
    const destinationDenormalizedEntity = await craeteDenormalizedEntity(destinationEntity);
  
    await findOneAndUpdate(denormalizedEntityModel, {id: sourceDenormalizedEntity.id}, sourceDenormalizedEntity)
    await findOneAndUpdate(denormalizedEntityModel, {id: destinationDenormalizedEntity.id}, destinationDenormalizedEntity)
  }
  
  // await transactions(insertTwoEntitysWithTransaction(sourceDenormalizedEntity, destinationDenormalizedEntity));
};
