import config, { collectionsMap } from "../config";
import { MyChangeEvent } from "../config/types";
import getCollectionName from "../util/getCollectionName";
// import { getEntityFromChangeEvent } from "../util/getEntity";
import DIHandler from "./collectionsHandlers/DIHandler";
import OGHandler from "./collectionsHandlers/OGHandler";
import entityHandler from "./collectionsHandlers/entityHandler";
import roleHandler from "./collectionsHandlers/roleHandler";

const { mongo } = config;

const isIgnoreChangeQuery = (operationType: string) =>
  !config.operationTypes[operationType];

const isDependencyFieldChangedQuery = (
  changeEventObject: MyChangeEvent,
  collectionName: string,
  operationType: String
) => {
  if (operationType == config.operationTypes.update) {
    const updatedFields =
      changeEventObject.description.updateDescription.updatedFields;
    for (const updatedField in updatedFields) {
      for (const connectionField in collectionsMap.objectCconnectionFields[collectionName]) {
        if (connectionField && connectionField == updatedField) return true;
      }
    }
    return false;
  } else return false;
};

const collectionsHandler = {
  [mongo.digitalIdentityCollectionName]: DIHandler,
  [mongo.entityCollectionName]: entityHandler,
  [mongo.roleCollectionName]: roleHandler,
  [mongo.organizationGroupCollectionName]: OGHandler,
};

export default async (changeEventObject: MyChangeEvent) => {
  const operationType = changeEventObject?.description?.operationType as string;
  const collectionName = getCollectionName(changeEventObject);

  if (!isIgnoreChangeQuery(operationType)) {
    const changedObject = changeEventObject.description.fullDocument as any;
    // const entity = await getEntityFromChangeEvent(changeEventObject, collectionName);
    if (
      isDependencyFieldChangedQuery(
        changeEventObject,
        collectionName,
        operationType
      )
    ) {
      await collectionsHandler[collectionName](
        changedObject,
        true,
        operationType
      );
    } else {
      // if (!entity) {
      //   console.error(
      //     "the entity that matches this change does not exist in the DB:",
      //     changeEventObject.description.fullDocument
      //   );
      // } else //send object id
      await collectionsHandler[collectionName](
        changedObject,
        false,
        operationType
      );
    }
  }
};
// TODO reintilize the db on 286 error code
