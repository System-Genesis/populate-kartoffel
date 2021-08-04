import config, { collectionsMap } from "../../config";
import { DigitalIdentity } from "../../config/types";
import connectionChangeUpdate from "../connectionChangeUpdate";
import regularChangeUpdate from "../regularChangeUpdate";

const DICollectionName = config.mongo.digitalIdentityCollectionName;

export default async (updatedDI: DigitalIdentity, connectionUpdate: boolean, operationType: string) => {
  const updatedDIId = updatedDI[collectionsMap.uniqueID[DICollectionName]]
  if (operationType == config.operationTypes.insert) {
    await regularChangeUpdate(updatedDIId, DICollectionName);
    
  } else if (operationType == config.operationTypes.update) {
    if (connectionUpdate && !updatedDI[collectionsMap.objectCconnectionFields[DICollectionName]]) {
      await regularChangeUpdate(updatedDIId, DICollectionName);
      const roleDigitalIdentity = await getConnectedObject(updatedDIId)
      
      if(roleDigitalIdentity) await DIHandler(roleDigitalIdentity, false, config.operationTypes.update)
      else{
        const entityDigitalIdentity = await getConnectedObject(updatedDIId)
        await entityHandler(entityDigitalIdentity, false, config.operationTypes.update)
      }
    } else {
      const roleDigitalIdentity = await getConnectedObject(updatedDIId)
      await regularChangeUpdate(updatedDIId, DICollectionName);
      await DIHandler(roleDigitalIdentity, false, config.operationTypes.update)
    }
  }  
};
