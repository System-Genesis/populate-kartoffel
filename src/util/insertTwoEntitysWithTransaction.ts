import { DenormalizedEntity } from "../config/types";
import { denormalizedEntityModel } from "./repo/models";
import { findOneAndUpdate } from "./repo/repository";

export default async (sourceDenormalizedEntity: DenormalizedEntity, destinationDenormalizedEntity: DenormalizedEntity) =>{
    findOneAndUpdate(denormalizedEntityModel, {id: sourceDenormalizedEntity.id}, sourceDenormalizedEntity)
    findOneAndUpdate(denormalizedEntityModel, {id: destinationDenormalizedEntity.id}, destinationDenormalizedEntity)
}