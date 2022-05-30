import {
  denormalizedDigitalIdentityModel,
  denormalizedEntityModel,
  denormalizedOrganizationGroupModel,
  denormalizedRoleModel,
  digitalIdentityModel,
  entityModel,
  organizationGroupModel,
  roleModel,
} from "../infra/repo/models";
import { config } from "./index";

const collectionsMap = {
  uniqueID: {
    [config.mongo.digitalIdentityCollectionName]: "uniqueId",
    [config.mongo.entityCollectionName]: "_id",
    [config.mongo.roleCollectionName]: "roleId",
    [config.mongo.organizationGroupCollectionName]: "_id",
    [config.mongo.denormalizedDICollectionName]: "uniqueId",
    [config.mongo.denormalizedEntityCollectionName]: "_id",
    [config.mongo.denormalizedRoleCollectionName]: "roleId",
    [config.mongo.denormalizedOGCollectionName]: "_id",
  },
  objectConnectionFields: {
    [config.mongo.digitalIdentityCollectionName]: {
      [config.mongo.entityCollectionName]: "entityId",
    },
    [config.mongo.entityCollectionName]: {},
    [config.mongo.roleCollectionName]: {
      [config.mongo.digitalIdentityCollectionName]: "digitalIdentityUniqueId",
      // [config.mongo.organizationGroupCollectionName]: "directGroup",
    },
    [config.mongo.organizationGroupCollectionName]: {
      directGroup: "directGroup",
      name: "name",
    },
  },
  modelsMap: {
    [config.mongo.digitalIdentityCollectionName]: digitalIdentityModel,
    [config.mongo.entityCollectionName]: entityModel,
    [config.mongo.roleCollectionName]: roleModel,
    [config.mongo.organizationGroupCollectionName]: organizationGroupModel,
    [config.mongo.denormalizedDICollectionName]: denormalizedDigitalIdentityModel,
    [config.mongo.denormalizedEntityCollectionName]: denormalizedEntityModel,
    [config.mongo.denormalizedRoleCollectionName]: denormalizedRoleModel,
    [config.mongo.denormalizedOGCollectionName]: denormalizedOrganizationGroupModel,
  },
  denormalizedModelsMap: {
    [config.mongo.digitalIdentityCollectionName]: denormalizedDigitalIdentityModel,
    [config.mongo.entityCollectionName]: denormalizedEntityModel,
    [config.mongo.roleCollectionName]: denormalizedRoleModel,
    [config.mongo.organizationGroupCollectionName]: denormalizedOrganizationGroupModel,
  },
};

// TODO move string config fields to the .env file
export default collectionsMap;
