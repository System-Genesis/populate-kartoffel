import { DigitalIdentity, Entity , Role, OrganizationGroup } from "../config/types";
import craeteDenormalizedObject from "../util/craeteDenormalizedObject";
import { findOne, findOneAndUpdate } from "../util/repo/repository";
import { denormalizedEntityModel } from "../util/repo/models";
import config, { collectionsMap } from "../config";
import { getEntityOptions } from "../util/getEntity";
import regularChangeUpdate from "./regularChangeUpdate";

export default async (
  destinationObject: Entity | DigitalIdentity | OrganizationGroup | Role,
  collectionName: string,
  changedObjectId: string
) => {
  const sourceObjectIdFindOneQuery = {
    [collectionsMap.uniqueIDPath[collectionName]]: changedObjectId,
  }; // corrent collection and dest collection
  const sourceDenormalizedEntityBeforeChange = await findOne(
    denormalizedEntityModel,
    sourceObjectIdFindOneQuery
  );
  const sourceEntity = await getEntityOptions[
    config.mongo.denormalizedEntityCollectionName
  ](sourceDenormalizedEntityBeforeChange as any);

  if (!sourceEntity) {
    regularChangeUpdate(destinationObject, collectionName);
  } else {
    const sourceDenormalizedEntity = await craeteDenormalizedObject[
      config.mongo.entityCollectionName
    ](sourceEntity);
    const destinationDenormalizedEntity = await craeteDenormalizedObject[
      config.mongo.entityCollectionName
    ](destinationObject as any);

    await findOneAndUpdate(
      collectionsMap.modelsMap[collectionName],
      {
        [collectionsMap.uniqueID[collectionName]]:
          sourceDenormalizedEntity[collectionsMap.uniqueID[collectionName]],
      },
      sourceDenormalizedEntity
    );
    await findOneAndUpdate(
      collectionsMap.modelsMap[collectionName],
      {
        [collectionsMap.uniqueID[collectionName]]:
          destinationDenormalizedEntity[
            collectionsMap.uniqueID[collectionName]
          ],
      },
      destinationDenormalizedEntity
    );
  }

  // await transactions(insertTwoEntitysWithTransaction(sourceDenormalizedEntity, destinationDenormalizedEntity));
};
