import { DigitalIdentity, Entity, MyChangeEvent, OrganizationGroup, Role } from "../config/types";
import config from "../config/index";

const { mongo } = config;

export default (changeEventObject: MyChangeEvent, collection: string) : Role=> {
  return roleGetOptions[collection](changeEventObject.description as any);
};

const getRoleWithDigitalIdentity = (digitalIdentity: DigitalIdentity) : Role => {

};

const getRoleWithEntity = (entity: Entity) : Role => {

};

const getRoleWithRole = (role: Role) : Role => {

};

const roleGetOptions = {
  [mongo.digitalIdentityCollectionName]: getRoleWithDigitalIdentity,
  [mongo.entityCollectionName]: getRoleWithEntity,
  [mongo.roleCollectionName]: getRoleWithRole,
};
