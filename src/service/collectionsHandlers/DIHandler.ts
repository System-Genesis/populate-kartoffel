import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { DigitalIdentity, Entity } from "../../config/types";
import { getConnectedObject } from "../../util/getConnectedObject";
import { digitalIdentityModel } from "../../util/repo/models";
import { findOne } from "../../util/repo/repository";
import regularChangeUpdate from "../regularChangeUpdate";
import entityHandler from "./entityHandler";

const DICollectionName = config.mongo.digitalIdentityCollectionName;
const entityCollectionName = config.mongo.entityCollectionName;

export default async (updatedDI: DigitalIdentity, connectionUpdate: boolean, operationType: string) => {
  const updatedDIId = updatedDI[collectionsMap.uniqueID[DICollectionName]]
  const DI = await findOne(digitalIdentityModel, {[collectionsMap.uniqueID[DICollectionName]]: updatedDIId})
  if (operationType == config.operationTypes.insert) {
    await regularChangeUpdate(updatedDIId, DICollectionName);

  } else {
    if (connectionUpdate && !updatedDI[collectionsMap.objectCconnectionFields[DICollectionName][entityCollectionName]]) {
      const DIEntity = await getConnectedObject(DI, DICollectionName, entityCollectionName) as Entity
      await entityHandler(DIEntity)
      await regularChangeUpdate(updatedDIId, DICollectionName);
      
    } else {
      const DIEntity = await getConnectedObject(DI, DICollectionName, entityCollectionName) as Entity
      await entityHandler(DIEntity)
      await regularChangeUpdate(updatedDIId, DICollectionName);
    }
  }  
};
