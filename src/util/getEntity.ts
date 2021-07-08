import { DenormalizedEntity, DigitalIdentity, Entity, MyChangeEvent, Role } from "../config/types";
import config from "../config/index";
import { digitalIdentityModel, entityModel } from "./repo/models";
import extractChangeEventObjectType from "./extractChangeEventObjectType";
import { findOne } from "./repo/repository";

const { mongo } = config;

const getEntityWithDigitalIdentity = async(digitalIdentity: DigitalIdentity) => {
  if(digitalIdentity) return await findOne(entityModel, {id: digitalIdentity.entityId})
  else return null
};

const getEntityWithEntity = async (entity: Entity | DenormalizedEntity) => {
  if(entity) return await findOne(entityModel, {id: entity.id})
  else return null
};

const getEntityWithRole = async (role: Role) => {
   let roleDI = await findOne(digitalIdentityModel, {uniqueId: role.digitalIdentityUniqueId}) as DigitalIdentity;
   if(role) return await getEntityWithDigitalIdentity(roleDI)
   else return null
  
};

export const getEntityOptions = {
  [mongo.digitalIdentityCollectionName]: getEntityWithDigitalIdentity,
  [mongo.denormalizedEntityCollectionName]: getEntityWithEntity,
  [mongo.entityCollectionName]: getEntityWithEntity,
  [mongo.roleCollectionName]: getEntityWithRole,
};

export const getEntityFromChangeEvent =  async (changeEventObject: MyChangeEvent) => {
  const changeEventObjectType = extractChangeEventObjectType(changeEventObject);
  return await getEntityOptions[changeEventObjectType](changeEventObject.description.fullDocument as any);
};
