import { collectionsMap } from "../config";
// import { Entity, DigitalIdentity, OrganizationGroup, Role} from "../config/types";
import craeteDenormalizedObject from "../util/craeteDenormalizedObject";
import { create, findOneAndUpdate } from "../util/repo/repository";

export default async (dataObjectId: string, collectionName: string) => {
  const denormalizedObject = await craeteDenormalizedObject[collectionName](dataObjectId as any);
  const filterQuery = {
    [collectionsMap.uniqueID[collectionName]]:
      denormalizedObject[collectionsMap.uniqueID[collectionName]],
  }; 
  const responseFromDB = await findOneAndUpdate(collectionsMap.modelsMap[collectionName], filterQuery, denormalizedObject)
  if(!responseFromDB) await create(collectionsMap.modelsMap[collectionName], denormalizedObject)
  console.log('the change has completed:', JSON.stringify(denormalizedObject))
};
