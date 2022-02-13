import { ObjectId } from "mongodb";
import { Model } from "mongoose";

//transforming functions to mongo actions 

/**
 * transform the find function to a mongo function
 * @param model the collection model  
 * @param filter what is the filter for mongo
 * @returns {array} recieved from mongo (lean)
 */
export const find = async (
  model: Model<any, any, any>,
  filter: object | ObjectId
) => await model.find(filter).lean();

/**
 * transform the findOne function to a mongo function
 * @param model the collection model  
 * @param filter what is the filter for mongo
 * @returns {object} the object recieved from mongo (lean)
 */
export const findOne = async (model: Model<any, any, any>,filter: object | ObjectId) => {
  return await model.findOne(filter).lean();
}

/**
 * transform the findOneAndReplace function to a mongo function
 * @param model the collection model  
 * @param filter what is the filter for mongo
 * @param objectToInsert the inserted object
 * @returns {object} the new replaced object from mongo (lean)
 */
export const findOneAndReplace = async (
  model: Model<any, any, any>,
  filter: object | ObjectId,
  objectToInsert: object
) => {
    return await model.findOneAndReplace(filter, objectToInsert).lean();
}

/**
 * transform the findOneAndUpdate function to a mongo function
 * @param model the collection model  
 * @param filter what is the filter for mongo
 * @param objectToInsert the inserted object
 * @returns {object} the new updated object from mongo (lean)
 */
export const findOneAndUpdate = async (
  model: Model<any, any, any>,
  filter: object | ObjectId,
  objectToInsert: object
) => await model.findOneAndUpdate(filter, objectToInsert).lean();

/**
 * transform the create function to a mongo function
 * @param model the collection model  
 * @param objectToInsert the inserted object
 * @returns {object} the object created mongo 
 */
export const create = async (
  model: Model<any, any, any>,
  objectToInsert: object
) => await model.create(objectToInsert);

/**
 * transform the deleteOne function to a mongo function
 * @param model the collection model  
 * @param filter what is the filter for mongo
 * @returns {object} the objected that has been deleted from mongo (lean)
 */
export const deleteOne = async (model: Model<any, any, any>,filter: object | ObjectId) => {
  return await model.deleteOne(filter).lean();
}
