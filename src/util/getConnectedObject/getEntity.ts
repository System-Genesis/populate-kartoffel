import { DenormalizedDigitalIdentity, DenormalizedEntity, DenormalizedRole, DigitalIdentity, Entity, MyChangeEvent, Role } from "../../config/types";
import config from "../../config/index";
import { denormalizedDigitalIdentityModel, digitalIdentityModel, entityModel } from "../repo/models";
import { findOne } from "../repo/repository";

const { mongo } = config;

// TODO generic Fields
const getEntityByDigitalIdentity = async(digitalIdentity: DigitalIdentity | DenormalizedDigitalIdentity ) => {
  if(digitalIdentity) return await findOne(entityModel, { _id: digitalIdentity.entityId})
  else return null
};

const getEntityByEntity = async (entity: Entity | DenormalizedEntity) => {
  if(entity) return await findOne(entityModel, { _id: entity._id})
  else return null
};

const getEntityByRole = async (role: Role | DenormalizedRole) => {
   let roleDI = await findOne(digitalIdentityModel, {uniqueId: role.digitalIdentityUniqueId}) as DigitalIdentity;
   if(role) return await getEntityByDigitalIdentity(roleDI)
   else return null
  
};

const getEntityByDenormalizedRole = async (role: Role | DenormalizedRole) => {
  let roleDI = await findOne(denormalizedDigitalIdentityModel, {uniqueId: role.digitalIdentityUniqueId}) as DenormalizedDigitalIdentity;
  if(role) return await getEntityByDigitalIdentity(roleDI)
  else return null
 
};

export const entityGetOptions = {
  [mongo.digitalIdentityCollectionName]: getEntityByDigitalIdentity,
  [mongo.entityCollectionName]: getEntityByEntity,
  [mongo.roleCollectionName]: getEntityByRole,
  [mongo.denormalizedDICollectionName]: getEntityByDigitalIdentity,
  [mongo.denormalizedEntityCollectionName]: getEntityByEntity,
  [mongo.denormalizedRoleCollectionName]: getEntityByDenormalizedRole,
};

export const getEntityFromChangeEvent =  async (changeEventObject: MyChangeEvent, collectionName: string) => {
  return await entityGetOptions[collectionName](changeEventObject.description.fullDocument as any);
};
