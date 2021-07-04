import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { DenormalizedEntity } from "../../config/types";

export const find = async (
  model: Model<any, any, any>,
  filter: object | ObjectId
) => await model.find(filter).lean();

export const findOne = async (model: Model<any, any, any>,filter: object | ObjectId) => {
  return await model.findOne(filter).lean();
}

export const findOneAndReplace = async (
  model: Model<any, any, any>,
  filter: object | ObjectId,
  objectToInsert: object
) => {
  try{
    return await model.findOneAndReplace(filter, objectToInsert);
  }
  catch (err){
    console.log(err)
  }
}

export const findOneAndUpdate = async (
  model: Model<any, any, any>,
  filter: object | ObjectId,
  objectToInsert: object
) => await model.findOneAndUpdate(filter, objectToInsert);

export const create = async (
  model: Model<any, any, any>,
  newDenormalizedEntity: DenormalizedEntity
) => await model.create(newDenormalizedEntity);
