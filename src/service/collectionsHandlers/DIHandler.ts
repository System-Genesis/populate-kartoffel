import { Types } from "mongoose";
import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { DigitalIdentity, Entity } from "../../config/types";
import { getConnectedObject } from "../../util/getConnectedObject";
import regularChangeUpdate from "../regularChangeUpdate";
import entityHandler from "./entityHandler";

const DICollectionName = config.mongo.digitalIdentityCollectionName;
const denormalizedDICollectionName = config.mongo.denormalizedDICollectionName;
const entityCollectionName = config.mongo.entityCollectionName;

export default async (updatedDI: DigitalIdentity, connectionUpdate: boolean, operationType: string) => {
  if (!updatedDI) {
    console.log(`trying to access to 'DigitalIdentity' that doesn't exist`)
  } else {
    const updatedDIId = updatedDI.uniqueId;
    if (operationType != config.operationTypes.insert) {
      // TODO-ELI: calling the same function at both scenarios
      //           better just change the values and call 'getConnectedObject' and 'entityHandler' once
      if (connectionUpdate && !updatedDI[collectionsMap.objectConnectionFields[DICollectionName][entityCollectionName]]) { //disconnect
        const DIEntity = await getConnectedObject(updatedDIId, denormalizedDICollectionName, entityCollectionName) as Entity
        await entityHandler(DIEntity)
      } else { // connect/regular update
        // TODO-ELI: 'DIEntity' is confusing name consider connectedEntity instead
        const DIEntity = await getConnectedObject(updatedDIId, DICollectionName, entityCollectionName) as Entity
        await entityHandler(DIEntity)
      }
    }  
    await regularChangeUpdate(updatedDIId as unknown as Types.ObjectId, DICollectionName);
  }
};
