import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { Role } from "../../config/types";
import regularChangeUpdate from "../regularChangeUpdate";
import DIHandler from "./DIHandler";
import entityHandler from "./entityHandler";
import { getConnectedObject } from "../../util/getConnectedObject";
import { roleModel } from "../../util/repo/models";
import { findOne } from "../../util/repo/repository";

const roleCollectionName = config.mongo.roleCollectionName;
const DICollectionName = config.mongo.digitalIdentityCollectionName;
const entityCollectionName = config.mongo.entityCollectionName;

export default async (updatedRole: Role, connectionUpdate: boolean, operationType: string) => {
  const updatedRoleId = updatedRole[collectionsMap.uniqueID[roleCollectionName]]
  const role = await findOne(roleModel, {[collectionsMap.uniqueID[roleCollectionName]]: updatedRoleId})
  if (operationType != config.operationTypes.insert) {
    if (connectionUpdate && !updatedRole[collectionsMap.objectCconnectionFields[roleCollectionName][DICollectionName] as string]) {
      const roleDigitalIdentity = await getConnectedObject(role, roleCollectionName, DICollectionName)
      
      if(roleDigitalIdentity) await DIHandler(roleDigitalIdentity, false, config.operationTypes.update)
      else{
        const entityDigitalIdentity = await getConnectedObject(role, roleCollectionName, entityCollectionName)
        await entityHandler(entityDigitalIdentity)
      }
    } else {
      const roleDigitalIdentity = await getConnectedObject(role, roleCollectionName, DICollectionName)
      await DIHandler(roleDigitalIdentity, false, config.operationTypes.update)
    }
  }  
  await regularChangeUpdate(updatedRoleId, roleCollectionName);
};

