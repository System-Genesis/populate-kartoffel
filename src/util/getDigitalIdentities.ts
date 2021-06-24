import { DigitalIdentity, Entity, MyChangeEvent, OrganizationGroup, Role } from "../config/types";
import config from "../config/index";
import { digitalIdentityModel } from "./repo/models";

const { mongo } = config;

export default (changeEventObject: MyChangeEvent, collection: string) : DigitalIdentity[]=> {
  return digitalIdentityGetOptions[collection](changeEventObject.description as any);
};

const getDigitalIdentityWithDigitalIdentity = (digitalIdentity: DigitalIdentity) : DigitalIdentity[] => {
  return digitalIdentityModel.find({uniqueId: digitalIdentity.uniqueId})
};

const getDigitalIdentityWithEntity = (entity: Entity) : DigitalIdentity[] => {
  return digitalIdentityModel.find({entityId: entity.id})
};

const getDigitalIdentityWithRole = (role: Role) : DigitalIdentity[] => {
  return digitalIdentityModel.find({uniqueId: role.digitalIndentityUniqueId})
};

const digitalIdentityGetOptions = {
  [mongo.digitalIdentityCollectionName]: getDigitalIdentityWithDigitalIdentity,
  [mongo.entityCollectionName]: getDigitalIdentityWithEntity,
  [mongo.roleCollectionName]: getDigitalIdentityWithRole,
};
