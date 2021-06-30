import { DenormalizedEntity } from "../config/types";
import { denormalizedEntityModel } from "./repo/models";
import { findOneAndReplace } from "./repo/repository";

export default async (sourceDenormalizedEntity: DenormalizedEntity, destinationDenormalizedEntity: DenormalizedEntity) =>{
    findOneAndReplace(denormalizedEntityModel, {id: sourceDenormalizedEntity.id}, sourceDenormalizedEntity)
    findOneAndReplace(denormalizedEntityModel, {id: destinationDenormalizedEntity.id}, destinationDenormalizedEntity)
}