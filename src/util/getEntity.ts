import { DenormalizedEntity, DigitalIdentity, Entity, MyChangeEvent, Role } from "../config/types";
import config from "../config/index";
import { digitalIdentityModel, entityModel } from "./repo/models";
import getCollectionName from "./getCollectionName";
import { findOne } from "./repo/repository";

const { mongo } = config;

const getEntityByDigitalIdentity = async(digitalIdentity: DigitalIdentity) => {
  if(digitalIdentity) return await findOne(entityModel, {id: digitalIdentity.entityId})
  else return null
};

const getEntityByEntity = async (entity: Entity | DenormalizedEntity) => {
  if(entity) return await findOne(entityModel, {id: entity.id})
  else return null
};

const getEntityByRole = async (role: Role) => {
   let roleDI = await findOne(digitalIdentityModel, {uniqueId: role.digitalIdentityUniqueId}) as DigitalIdentity;
   if(role) return await getEntityByDigitalIdentity(roleDI)
   else return null
  
};

export const getEntityOptions = {
  [mongo.digitalIdentityCollectionName]: getEntityByDigitalIdentity,
  [mongo.denormalizedEntityCollectionName]: getEntityByEntity,
  [mongo.entityCollectionName]: getEntityByEntity,
  [mongo.roleCollectionName]: getEntityByRole,
};

export const getEntityFromChangeEvent =  async (changeEventObject: MyChangeEvent) => {
  const collectionName = getCollectionName(changeEventObject);
  return await getEntityOptions[collectionName](changeEventObject.description.fullDocument as any);
};
