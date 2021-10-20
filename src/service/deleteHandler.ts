import config from "../config";
import { denormalizedDigitalIdentityModel, denormalizedEntityModel, denormalizedOrganizationGroupModel, denormalizedRoleModel } from "../util/repo/models";
import { deleteOne, findOne } from "../util/repo/repository";
import DIHandler from "./collectionsHandlers/DIHandler";
import entityHandler from "./collectionsHandlers/entityHandler";

const { mongo } = config;

const DIDeleteHandler = async (DIId: string)=>{
  const connectedEntity = await findOne(denormalizedEntityModel, {'digitalIdentities._id': DIId})
  await entityHandler(connectedEntity);
  await deleteOne(denormalizedDigitalIdentityModel,{_id: DIId})
}

const entityDeleteHandler = async (entityId: string)=>{
  await deleteOne(denormalizedEntityModel, {_id: entityId})
}

const roleDeleteHandler = async (roleId: string)=>{
  const connectedDI = await findOne(denormalizedDigitalIdentityModel, {'role._id': roleId})
  // const connectedDI = await getConnectedObject(roleId,  mongo.digitalIdentityCollectionName, mongo.entityCollectionName)
  if(connectedDI) await DIHandler(connectedDI, false, config.operationTypes.update)
  else{
    const connectedEntity = await findOne(denormalizedEntityModel, {'digitalIdentities.role._id': roleId})
    // const connectedEntity = await getConnectedObject(roleId, mongo.roleCollectionName, mongo.entityCollectionName)
    await entityHandler(connectedEntity)
  }
  await deleteOne(denormalizedRoleModel,{_id: roleId})
}

const OGDeleteHandler = async (OGId: string)=>{
  await deleteOne(denormalizedOrganizationGroupModel, {_id: OGId})
}

export const deleteHandler = {
  [mongo.digitalIdentityCollectionName]: DIDeleteHandler,
  [mongo.entityCollectionName]: entityDeleteHandler,
  [mongo.roleCollectionName]: roleDeleteHandler,
  [mongo.organizationGroupCollectionName]: OGDeleteHandler,
};