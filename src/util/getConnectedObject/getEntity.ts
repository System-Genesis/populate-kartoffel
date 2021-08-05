import { DenormalizedEntity, DigitalIdentity, Entity, MyChangeEvent, Role } from "../../config/types";
import config from "../../config/index";
import { digitalIdentityModel, entityModel } from "../repo/models";
import { findOne } from "../repo/repository";

const { mongo } = config;

// TODO generic Fields
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

export const entityGetOptions = {
  [mongo.digitalIdentityCollectionName]: getEntityByDigitalIdentity,
  [mongo.denormalizedEntityCollectionName]: getEntityByEntity,
  [mongo.entityCollectionName]: getEntityByEntity,
  [mongo.roleCollectionName]: getEntityByRole,
};

export const getEntityFromChangeEvent =  async (changeEventObject: MyChangeEvent, collectionName: string) => {
  return await entityGetOptions[collectionName](changeEventObject.description.fullDocument as any);
};
