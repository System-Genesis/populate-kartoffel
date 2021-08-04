import config, { collectionsMap } from "../../config";
import { Role } from "../../config/types";
import regularChangeUpdate from "../regularChangeUpdate";
import DIHandler from "./DIHandler";
import entityHandler from "./entityHandler";

const roleCollectionName = config.mongo.roleCollectionName;

export default async (updatedRole: Role, connectionUpdate: boolean, operationType: string) => {
  const updatedRoleId = updatedRole[collectionsMap.uniqueID[roleCollectionName]]
  if (operationType == config.operationTypes.insert) {
    await regularChangeUpdate(updatedRoleId, roleCollectionName);
  
  } else if (operationType == config.operationTypes.update) {
    if (connectionUpdate && !updatedRole[collectionsMap.objectCconnectionFields[roleCollectionName]]) {
      await regularChangeUpdate(updatedRoleId, roleCollectionName);
      const roleDigitalIdentity = await getConnectedObject(updatedRoleId)
      
      if(roleDigitalIdentity) await DIHandler(roleDigitalIdentity, false, config.operationTypes.update)
      else{
        const entityDigitalIdentity = await getConnectedObject(updatedRoleId)
        await entityHandler(entityDigitalIdentity, false, config.operationTypes.update)
      }
    } else {
      const roleDigitalIdentity = await getConnectedObject(updatedRoleId)
      await regularChangeUpdate(updatedRoleId, roleCollectionName);
      await DIHandler(roleDigitalIdentity, false, config.operationTypes.update)
    }
  }  
};
// define getConnectedObject