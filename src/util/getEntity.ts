import { DigitalIdentity, Entity, MyChangeEvent, Role } from "../config/types";
import config from "../config/index";
import { digitalIdentityModel, entityModel } from "./repo/models";
import extractChangeEventObjectType from "./extractChangeEventObjectType";
import { find, findOne } from "./repo/repository";

const { mongo } = config;

export default async (changeEventObject: MyChangeEvent) => {
  const changeEventObjectType = extractChangeEventObjectType(changeEventObject);
  return entityGetOptions[changeEventObjectType](changeEventObject.description as any);
};

const getEntityWithDigitalIdentity = async(digitalIdentity: DigitalIdentity) => {
  return await find(entityModel, {id: digitalIdentity.entityId})
};

const getEntityWithEntity = async (entity: Entity) => {
  return await find(entityModel, {id: entity.id})
};

const getEntityWithRole = async (role: Role) => {
   let roleDI = await findOne(digitalIdentityModel, {uniqueId: role.digitalIndentityUniqueId}) as DigitalIdentity;
   return await getEntityWithDigitalIdentity(roleDI)
  
};

const entityGetOptions = {
  [mongo.digitalIdentityCollectionName]: getEntityWithDigitalIdentity,
  [mongo.entityCollectionName]: getEntityWithEntity,
  [mongo.roleCollectionName]: getEntityWithRole,
};
