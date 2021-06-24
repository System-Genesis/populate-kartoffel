import { DigitalIdentity, Entity, MyChangeEvent, OrganizationGroup, Role } from "../config/types";
import config from "../config/index";
import { digitalIdentityModel, entityModel } from "./repo/models";

const { mongo } = config;

export default (changeEventObject: MyChangeEvent, collection: string) : Entity=> {
  return entityGetOptions[collection](changeEventObject.description as any);
};

const getEntityWithDigitalIdentity = (digitalIdentity: DigitalIdentity) : Entity => {
  return entityModel.find({id: digitalIdentity.entityId})
};

const getEntityWithEntity = (entity: Entity) : Entity => {
  return entityModel.find({id: entity.id})
};

const getEntityWithRole = (role: Role) : Entity => {
  digitalIdentityModel.find({uniqueId: role.digitalIndentityUniqueId})
};

const entityGetOptions = {
  [mongo.digitalIdentityCollectionName]: getEntityWithDigitalIdentity,
  [mongo.entityCollectionName]: getEntityWithEntity,
  [mongo.roleCollectionName]: getEntityWithRole,
};
