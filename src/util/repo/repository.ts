import { ObjectId } from "mongodb";
import { Model } from "mongoose";

export const find = async (
  model: Model<any, any, any>,
  filter: object | ObjectId
) => await model.find(filter);

export const findOne = async (
  model: Model<any, any, any>,
  filter: object | ObjectId
) => await model.findOne(filter);

export const findOneAndReplace = async (
  model: Model<any, any, any>,
  filter: object | ObjectId,
  objectToInsert: object
) => await model.findOneAndReplace(filter, objectToInsert);
