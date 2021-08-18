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
  const updatedDIId = updatedDI[collectionsMap.uniqueID[DICollectionName]]
  if (operationType == config.operationTypes.insert) {
  } else {
    if (connectionUpdate && !updatedDI[collectionsMap.objectCconnectionFields[DICollectionName][entityCollectionName]]) {
      const DIEntity = await getConnectedObject(updatedDIId, denormalizedDICollectionName, entityCollectionName) as Entity
      await entityHandler(DIEntity)
    } else {
      const DIEntity = await getConnectedObject(updatedDIId, DICollectionName, entityCollectionName) as Entity
      await entityHandler(DIEntity)
    }
  }  
  await regularChangeUpdate(updatedDIId, DICollectionName);
};
