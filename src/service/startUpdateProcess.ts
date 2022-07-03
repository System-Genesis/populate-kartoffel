import config from "../config";
import collectionsMap from "../config/collectionsMap";
import { MyChangeEvent } from "../config/types";
import getCollectionName from "../util/getCollectionName";
import DIHandler from "./collectionsHandlers/DIHandler";
import OGHandler from "./collectionsHandlers/OGHandler";
import entityHandler from "./collectionsHandlers/entityHandler";
import roleHandler from "./collectionsHandlers/roleHandler";
import { deleteHandler } from "./deleteHandler";
import logger from 'logger-genesis';

const { mongo, operationTypes } = config;

/**
 * checks if the change event is something that is interesting for our system
 * @param operationType the operation type (update, delete etc)
 * @returns {boolean} ignore this change or not
 */
const isIgnoreChangeQuery = (operationType: string) =>
  !operationTypes[operationType];

/**
 * checks if the change is about the connection between objects(connecting role to DI for example)
 * @param changeEventObject the event received from the change stream
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
      for (const connectionField in collectionsMap.objectConnectionFields[
        collectionName
      ]) {
        if (
          connectionField &&
          collectionsMap.objectConnectionFields[collectionName][
          connectionField
          ] == updatedField
        ) {
          return true;
        }
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
 * starting the update process, sends the received object to the write handler
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
      // console.log(
      //   `the object with the id '${changeEventObject.description.documentKey._id}' has deleted`
      // );
      logger.info(true, 'APP', `Object deleted in collection: ${changeEventObject.description.ns.coll}`,
        `Object with id: ${changeEventObject.description.documentKey._id} has deleted`);
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
