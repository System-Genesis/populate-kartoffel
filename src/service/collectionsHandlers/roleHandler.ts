import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { Role } from "../../config/types";
import regularChangeUpdate from "../regularChangeUpdate";
import DIHandler from "./DIHandler";
import entityHandler from "./entityHandler";
import { getConnectedObject } from "../../util/getConnectedObject";

const roleCollectionName = config.mongo.roleCollectionName;
const DICollectionName = config.mongo.digitalIdentityCollectionName;
const entityCollectionName = config.mongo.entityCollectionName;

export default async (updatedRole: Role, connectionUpdate: boolean, operationType: string) => {
  const updatedRoleId = updatedRole[collectionsMap.uniqueID[roleCollectionName]]
  if (operationType == config.operationTypes.insert) {
    await regularChangeUpdate(updatedRoleId, roleCollectionName);
  
  } else {
    if (connectionUpdate && !updatedRole[collectionsMap.objectCconnectionFields[roleCollectionName][DICollectionName] as string]) {
      await regularChangeUpdate(updatedRoleId, roleCollectionName);
      const roleDigitalIdentity = await getConnectedObject(updatedRoleId, roleCollectionName, DICollectionName)
      
      if(roleDigitalIdentity) await DIHandler(roleDigitalIdentity, false, config.operationTypes.update)
      else{
        const entityDigitalIdentity = await getConnectedObject(updatedRoleId, roleCollectionName, entityCollectionName)
        await entityHandler(entityDigitalIdentity)
      }
    } else {
      const roleDigitalIdentity = await getConnectedObject(updatedRoleId, roleCollectionName, DICollectionName)
      await regularChangeUpdate(updatedRoleId, roleCollectionName);
      await DIHandler(roleDigitalIdentity, false, config.operationTypes.update)
    }
  }  
};

