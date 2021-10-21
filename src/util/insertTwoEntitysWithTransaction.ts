import { DenormalizedEntity } from "../config/types";
import { denormalizedEntityModel } from "../infra/repo/models";
import { findOneAndUpdate } from "../infra/repo/repository";

export default async (sourceDenormalizedEntity: DenormalizedEntity, destinationDenormalizedEntity: DenormalizedEntity) =>{
    findOneAndUpdate(denormalizedEntityModel, {_id: sourceDenormalizedEntity._id}, sourceDenormalizedEntity)
    findOneAndUpdate(denormalizedEntityModel, {_id: destinationDenormalizedEntity._id}, destinationDenormalizedEntity)
}