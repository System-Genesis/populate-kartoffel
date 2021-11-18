import config from "../config";
import collectionsMap from "../config/collectionsMap";
import { MyChangeEvent } from "../config/types";
import getCollectionName from "../util/getCollectionName";
import DIHandler from "./collectionsHandlers/DIHandler";
import OGHandler from "./collectionsHandlers/OGHandler";
import entityHandler from "./collectionsHandlers/entityHandler";
import roleHandler from "./collectionsHandlers/roleHandler";
import { deleteHandler } from "./deleteHandler";
import { updatePersonsOnCommand } from "../mocks/mocksGenerator";

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
    const removedFields =
      changeEventObject.description.updateDescription.removedFields;
    const allUpdatesFields =removedFields.concat(Object.keys(updatedFields))
    for (const updatedField of allUpdatesFields) {
      for (const connectionField in collectionsMap.objectConnectionFields[collectionName]) {
        if (connectionField && collectionsMap.objectConnectionFields[collectionName][connectionField] == updatedField) return true;
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
    if (operationType == config.operationTypes.delete){
     await deleteHandler[collectionName](changeEventObject.description.documentKey._id)
      console.log(`the object with the id '${changeEventObject.description.documentKey._id}' has deleted`)
    } else if(
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
      await collectionsHandler[collectionName](
        changedObject,
        false,
        operationType
      );
    }
  }
};
// TODO reinitialize the db on 286 error code
