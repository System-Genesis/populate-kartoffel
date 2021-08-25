import { DenormalizedEntity } from "../config/types";
import { denormalizedEntityModel } from "./repo/models";
import { findOneAndUpdate } from "./repo/repository";

export default async (sourceDenormalizedEntity: DenormalizedEntity, destinationDenormalizedEntity: DenormalizedEntity) =>{
    findOneAndUpdate(denormalizedEntityModel, {_id: sourceDenormalizedEntity._id}, sourceDenormalizedEntity)
    findOneAndUpdate(denormalizedEntityModel, {_id: destinationDenormalizedEntity._id}, destinationDenormalizedEntity)
}