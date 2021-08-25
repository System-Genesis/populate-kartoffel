import { Types } from "mongoose";
import collectionsMap  from "../config/collectionsMap";
import createDenormalizedObject from "../util/createDenormalizedObject";
import { create, findOneAndUpdate } from "../util/repo/repository";

export default async (dataObjectId: Types.ObjectId, collectionName: string) => {
  if(!dataObjectId){
    console.log('error ')
  } else{
    const denormalizedObject = await createDenormalizedObject[collectionName](dataObjectId as any);
    const filterQuery = {
      [collectionsMap.uniqueID[collectionName]]:
        denormalizedObject[collectionsMap.uniqueID[collectionName]],
    }; 
    const id = denormalizedObject._id
    delete denormalizedObject._id
    const responseFromDB = await findOneAndUpdate(collectionsMap.denormalizedModelsMap[collectionName], filterQuery, denormalizedObject)
    if(!responseFromDB){
      denormalizedObject._id = id;
      await create(collectionsMap.denormalizedModelsMap[collectionName], denormalizedObject)
    } 
    console.log(`the change has completed in ${collectionName} collection:`, JSON.stringify(denormalizedObject))
  }
};
