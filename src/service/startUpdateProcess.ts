import config from "../config";
import collectionsMap from "../config/collectionsMap";
import { MyChangeEvent } from "../config/types";
import getCollectionName from "../util/getCollectionName";
import DIHandler from "./collectionsHandlers/DIHandler";
import OGHandler from "./collectionsHandlers/OGHandler";
import entityHandler from "./collectionsHandlers/entityHandler";
import roleHandler from "./collectionsHandlers/roleHandler";
import { deleteHandler } from "./deleteHandler";

const { mongo, operationTypes } = config;

/**
 * checks if the change event is somthing that is intersting for our system
 * @param operationType the operation type (update, delete etc)
 * @returns {boolean} ignore this change or not
 */
const isIgnoreChangeQuery = (operationType: string) =>
  !operationTypes[operationType];

/**
 * checks if the change is about the connection between objects(connecting role to DI for exemple)
 * @param changeEventObject the event recieved from the change stream
 * @param collectionName the collection of the change
 * @param operationType the operation type (update, delete etc)
 * @returns {boolean} is the change is about the connection between objects or not
 */
const isDependencyFieldChangedQuery = (
  changeEventObject: MyChangeEvent,
  collectionName: string,
  operationType: String
) => {
  if (operationType == operationTypes.update) {
    const updatedFields =
      changeEventObject.description.updateDescription.updatedFields;
    const removedFields =
      changeEventObject.description.updateDescription.removedFields;
    const allUpdatesFields = removedFields.concat(Object.keys(updatedFields));
    for (const updatedField of allUpdatesFields) {
      // TODO ELI: .include() does the job and looks much more sexy
      for (const connectionField in collectionsMap.objectConnectionFields[
        collectionName
      ]) {
        if (
          connectionField &&
          collectionsMap.objectConnectionFields[collectionName][
          connectionField
          ] == updatedField
        )
        // TODO ELI: add {} when its not one line condition
          return true;
      }
    }
    return false;
  }
  return false;
};

const collectionsHandler = {
  [mongo.digitalIdentityCollectionName]: DIHandler,
  [mongo.entityCollectionName]: entityHandler,
  [mongo.roleCollectionName]: roleHandler,
  [mongo.organizationGroupCollectionName]: OGHandler,
};

/**
 * starting the update process, sends the recieved object to the write handler
 * @param changeEventObject
 */
export default async (changeEventObject: MyChangeEvent) => {
  // TODO ELI: declare enum of operations
  const operationType = changeEventObject?.description?.operationType as string;
  const collectionName = getCollectionName(changeEventObject);

  if (!isIgnoreChangeQuery(operationType)) {
    const changedObject = changeEventObject.description.fullDocument as any;
    if (operationType == operationTypes.delete) {
      await deleteHandler[collectionName](
        changeEventObject.description.documentKey._id
      );
      console.log(
        `the object with the id '${changeEventObject.description.documentKey._id}' has deleted`
      );
    // TODO ELI: test this change 
    } else {
      const isDependencyChange = isDependencyFieldChangedQuery(
        changeEventObject,
        collectionName,
        operationType
      );
      await collectionsHandler[collectionName](
        changedObject,
        isDependencyChange,
        operationType
      );
    }
  }
};
// TODO reinitialize the db on 286 error code
