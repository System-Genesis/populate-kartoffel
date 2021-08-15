import {
  digitalIdentityModel,
  entityModel,
  organizationGroupModel,
  roleModel,
} from "../util/repo/models";
import { config } from "./index";

const collectionsMap = {
  uniqueID: {
    [config.mongo.digitalIdentityCollectionName]: "uniqueId",
    [config.mongo.entityCollectionName]: "id",
    [config.mongo.roleCollectionName]: "roleId",
    [config.mongo.organizationGroupCollectionName]: "id",
  },
  uniqueIDPath: {
    [config.mongo.digitalIdentityCollectionName]: "digitalIdentities.uniqueId",
    [config.mongo.entityCollectionName]: "id",
    [config.mongo.roleCollectionName]: "digitalIdentities.role.roleId",
    [config.mongo.organizationGroupCollectionName]: "", //TODO
  },
  objectCconnectionFields: {
    [config.mongo.digitalIdentityCollectionName]: {
      [config.mongo.entityCollectionName]: "entityId",
    },
    [config.mongo.entityCollectionName]: {},
    [config.mongo.roleCollectionName]: {
      [config.mongo.digitalIdentityCollectionName]: "digitalIdentityUniqueId",
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
  },
};
export default collectionsMap;
