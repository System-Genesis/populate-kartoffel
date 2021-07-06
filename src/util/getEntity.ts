import { DigitalIdentity, Entity, MyChangeEvent, Role } from "../config/types";
import config from "../config/index";
import { digitalIdentityModel, entityModel } from "./repo/models";
import extractChangeEventObjectType from "./extractChangeEventObjectType";
import { findOne } from "./repo/repository";

const { mongo } = config;

const getEntityWithDigitalIdentity = async(digitalIdentity: DigitalIdentity) => {
  if(digitalIdentity) return await findOne(entityModel, {id: digitalIdentity.entityId})
  else return null
};

const getEntityWithEntity = async (entity: Entity) => {
  if(entity) return await findOne(entityModel, {id: entity.id})
  else return null
};

const getEntityWithRole = async (role: Role) => {
   let roleDI = await findOne(digitalIdentityModel, {uniqueId: role.digitalIdentityUniqueId}) as DigitalIdentity;
   if(role) return await getEntityWithDigitalIdentity(roleDI)
   else return null
  
};

const entityGetOptions = {
  [mongo.digitalIdentityCollectionName]: getEntityWithDigitalIdentity,
  [mongo.entityCollectionName]: getEntityWithEntity,
  [mongo.roleCollectionName]: getEntityWithRole,
};

export default async (changeEventObject: MyChangeEvent) => {
  const changeEventObjectType = extractChangeEventObjectType(changeEventObject);
  return await entityGetOptions[changeEventObjectType](changeEventObject.description.fullDocument as any);
};
