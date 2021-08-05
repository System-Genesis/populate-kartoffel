import { DigitalIdentity, Entity, MyChangeEvent,/* OrganizationGroup,*/ Role } from "../../config/types";
import config from "../../config/index";
import { digitalIdentityModel } from "../repo/models";
import { find } from "../repo/repository";

const { mongo } = config;

const getDigitalIdentityWithDigitalIdentity = async (digitalIdentity: DigitalIdentity) => {
  if(digitalIdentity) return await find(digitalIdentityModel, {uniqueId: digitalIdentity.uniqueId})
  else return null
};

const getDigitalIdentityWithEntity = async (entity: Entity) => {
  if(entity) return await find(digitalIdentityModel, {entityId: entity.id})
  else return null
};

const getDigitalIdentityWithRole = async (role: Role) => {
  if(role) return await find(digitalIdentityModel, {uniqueId: role.digitalIdentityUniqueId})
  else return null
};

// const getDigitalIdentityWithOrganizationGroup = (organizationGroup: OrganizationGroup) => {

// };

export const digitalIdentityGetOptions = {
  [mongo.digitalIdentityCollectionName]: getDigitalIdentityWithDigitalIdentity,
  [mongo.entityCollectionName]: getDigitalIdentityWithEntity,
  [mongo.roleCollectionName]: getDigitalIdentityWithRole,
  // [mongo.organizationGroupCollectionName]: getDigitalIdentityWithOrganizationGroup,
};

export default (changeEventObject: MyChangeEvent, collection: string) => {
  return digitalIdentityGetOptions[collection](changeEventObject.description as any);
};
