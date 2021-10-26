import { ObjectId } from "mongodb";
import { Model } from "mongoose";

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
    return await model.findOneAndReplace(filter, objectToInsert).lean();
}

export const findOneAndUpdate = async (
  model: Model<any, any, any>,
  filter: object | ObjectId,
  objectToInsert: object
) => await model.findOneAndUpdate(filter, objectToInsert).lean();

export const create = async (
  model: Model<any, any, any>,
  objectToInsert: object
) => await model.create(objectToInsert);

export const deleteOne = async (model: Model<any, any, any>,filter: object | ObjectId) => {
  return await model.deleteOne(filter).lean();
}