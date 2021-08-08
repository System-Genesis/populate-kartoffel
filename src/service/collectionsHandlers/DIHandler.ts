import config, { collectionsMap } from "../../config";
import { DigitalIdentity } from "../../config/types";
import { getConnectedObject } from "../../util/getConnectedObject";
import regularChangeUpdate from "../regularChangeUpdate";
import entityHandler from "./entityHandler";

const DICollectionName = config.mongo.digitalIdentityCollectionName;
const entityCollectionName = config.mongo.entityCollectionName;

export default async (updatedDI: DigitalIdentity, connectionUpdate: boolean, operationType: string) => {
  const updatedDIId = updatedDI[collectionsMap.uniqueID[DICollectionName]]
  if (operationType == config.operationTypes.insert) {
    await regularChangeUpdate(updatedDIId, DICollectionName);

  } else {
    if (connectionUpdate && !updatedDI[collectionsMap.objectCconnectionFields[DICollectionName][entityCollectionName]]) {
      await regularChangeUpdate(updatedDIId, DICollectionName);
      const DIEntity = await getConnectedObject(updatedDIId, DICollectionName)
      await entityHandler(DIEntity, false, config.operationTypes.update)
      
    } else {
      const DIEntity = await getConnectedObject(updatedDIId)
      await regularChangeUpdate(updatedDIId, DICollectionName);
      await entityHandler(DIEntity, false, config.operationTypes.update)
    }
  }  
};
