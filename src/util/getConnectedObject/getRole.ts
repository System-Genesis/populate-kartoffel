import { DenormalizedDigitalIdentity, DenormalizedRole, DigitalIdentity,  MyChangeEvent,/*Entity, OrganizationGroup,*/ Role } from "../../config/types";
import config from "../../config";
import { roleModel } from "../repo/models";
import { findOne } from "../repo/repository";

const { mongo } = config;

const getRoleWithDigitalIdentity = async (digitalIdentity: DigitalIdentity | DenormalizedDigitalIdentity) => {
  if(digitalIdentity) return await findOne(roleModel, {digitalIdentityUniqueId: digitalIdentity.uniqueId})
  else return null
};

// const getRoleWithEntity = (entity: Entity) => {

// };

const getRoleWithRole = async (role: Role | DenormalizedRole)  => {
  if(role) return await findOne(roleModel, {roleId: role.roleId})
  else return null
};

// const getRoleWithOrganizationGroup = (organizationGroup: OrganizationGroup) => {

// };

export const roleGetOptions = {
  [mongo.digitalIdentityCollectionName]: getRoleWithDigitalIdentity,
  // [mongo.entityCollectionName]: getRoleWithEntity,
  [mongo.roleCollectionName]: getRoleWithRole,
  // [mongo.organizationGroupCollectionName]: getRoleWithOrganizationGroup,
};

export default (changeEventObject: MyChangeEvent, collectionName: string) => {
  return roleGetOptions[collectionName](changeEventObject.description.fullDocument as any);
};