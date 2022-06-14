import config from "../../config";
import collectionsMap from "../../config/collectionsMap";
import { Role } from "../../config/types";
import regularChangeUpdate from "../regularChangeUpdate";
import DIHandler from "./DIHandler";
import entityHandler from "./entityHandler";
import { getConnectedObject } from "../../util/getConnectedObject";
import { Types } from "mongoose";
import logger from 'logger-genesis';

const roleCollectionName = config.mongo.roleCollectionName;
const denormalizedRoleCollectionName = config.mongo.denormalizedRoleCollectionName;
const DICollectionName = config.mongo.digitalIdentityCollectionName;
const entityCollectionName = config.mongo.entityCollectionName;

export default async (updatedRole: Role, connectionUpdate: boolean, operationType: string) => {
  if (!updatedRole) {
    // console.log(`trying to access to 'Role' that doesn't exist`)
    logger.warn(false, 'APP', `trying to access to 'Role' that doesn't exist`, `trying to access to 'Role' that doesn't exist`);
  } else {
    const updatedRoleId = updatedRole.roleId;
    if (operationType != config.operationTypes.insert) {
      if (connectionUpdate && !updatedRole[collectionsMap.objectConnectionFields[roleCollectionName][DICollectionName] as string]) {
        const roleDigitalIdentity = await getConnectedObject(updatedRoleId, denormalizedRoleCollectionName, DICollectionName)

        if (roleDigitalIdentity) await DIHandler(roleDigitalIdentity, false, config.operationTypes.update)
        else {
          const entityDigitalIdentity = await getConnectedObject(updatedRoleId, denormalizedRoleCollectionName, entityCollectionName)
          await entityHandler(entityDigitalIdentity)
        }
      } else {
        const roleDigitalIdentity = await getConnectedObject(updatedRoleId, roleCollectionName, DICollectionName)
        await DIHandler(roleDigitalIdentity, false, config.operationTypes.update)
      }
    }
    await regularChangeUpdate(updatedRoleId as unknown as Types.ObjectId, roleCollectionName);
  }
};

