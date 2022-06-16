import { Types } from "mongoose";
import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { DigitalIdentity, Entity } from "../../config/types";
import { getConnectedObject } from "../../util/getConnectedObject";
import regularChangeUpdate from "../regularChangeUpdate";
import entityHandler from "./entityHandler";
import logger from 'logger-genesis';

const DICollectionName = config.mongo.digitalIdentityCollectionName;
const denormalizedDICollectionName = config.mongo.denormalizedDICollectionName;
const entityCollectionName = config.mongo.entityCollectionName;

export default async (updatedDI: DigitalIdentity, connectionUpdate: boolean, operationType: string) => {
  if (!updatedDI) {
    // console.log(`trying to access to 'DigitalIdentity' that doesn't exist`)
    logger.warn(false, 'APP', `trying to access to 'DigitalIdentity' that doesn't exist`, `trying to access to 'DigitalIdentity' that doesn't exist`);
  } else {
    const updatedDIId = updatedDI.uniqueId;
    if (operationType != config.operationTypes.insert) {
      let sourceCollectionName: string;
      if (connectionUpdate && !updatedDI[collectionsMap.objectConnectionFields[DICollectionName][entityCollectionName]]) { //disconnect
        sourceCollectionName = denormalizedDICollectionName
      } else { // connect/regular update
        sourceCollectionName = DICollectionName
      }
      const DIEntity = await getConnectedObject(updatedDIId, sourceCollectionName, entityCollectionName) as Entity
      await entityHandler(DIEntity)
    }
    await regularChangeUpdate(updatedDIId as unknown as Types.ObjectId, DICollectionName);
  }
};
