import collectionsMap  from "../config/collectionsMap";
// import { Entity, DigitalIdentity, OrganizationGroup, Role} from "../config/types";
import createDenormalizedObject from "../util/createDenormalizedObject";
import { create, findOneAndUpdate } from "../util/repo/repository";

export default async (dataObjectId: string, collectionName: string) => {
  if(!dataObjectId){
    console.log('error ')
  } else{
    const denormalizedObject = await createDenormalizedObject[collectionName](dataObjectId as any);
    const filterQuery = {
      [collectionsMap.uniqueID[collectionName]]:
        denormalizedObject[collectionsMap.uniqueID[collectionName]],
    }; 
    const responseFromDB = await findOneAndUpdate(collectionsMap.denormalizedModelsMap[collectionName], filterQuery, denormalizedObject)
    if(!responseFromDB) await create(collectionsMap.denormalizedModelsMap[collectionName], denormalizedObject)
    console.log('the change has completed:', JSON.stringify(denormalizedObject))
  }
};
