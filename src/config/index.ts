import * as env from "env-var";
import * as dotenv from "dotenv";
import {
  digitalIdentityModel,
  entityModel,
  organizationGroupModel,
  roleModel,
} from "../util/repo/models";

dotenv.config();

const config = {
  mongo: {
    denormalizedEntityCollectionName: env
      .get("DENORMALIZED_ENTITY_COLLECTION_NAME")
      .required()
      .asString(),
    denormalizedDICollectionName: env
      .get("DENORMALIZED_DI_COLLECTION_NAME")
      .required()
      .asString(),
    denormalizedOGCollectionName: env
      .get("DENORMALIZED_OG_COLLECTION_NAME")
      .required()
      .asString(),
    denormalizedRoleCollectionName: env
      .get("DENORMALIZED_ROLE_COLLECTION_NAME")
      .required()
      .asString(),
    organizationGroupCollectionName: env
      .get("ORGANIZATION_GROUP_COLLECTION_NAME")
      .required()
      .asString(),
    digitalIdentityCollectionName: env
      .get("DIGITAL_IDENTITY_COLLECTION_NAME")
      .required()
      .asString(),
    entityCollectionName: env
      .get("ENTITY_COLLECTION_NAME")
      .required()
      .asString(),
    roleCollectionName: env.get("ROLE_COLLECTION_NAME").required().asString(),
    uri:
      env.get("MONGODB_USER_NAME").asString() &&
      env.get("MONGODB_PASSWORD").asString()
        ? env.get("MONGO_PROTOCOL").required().asUrlString() +
          env.get("MONGODB_USER_NAME").asString() +
          ":" +
          env.get("MONGODB_PASSWORD").asString() +
          "@" +
          env.get("MONGO_URN").required().asUrlString()
        : env.get("MONGO_PROTOCOL").required().asUrlString() +
          env.get("MONGO_URN").required().asUrlString(),
  },
  rabbit: {
    uri: env.get("RABBIT_URI").required().asString(),
    queueName: env.get("RABBIT_QUEUE_NAME").required().asString(),
  },
  port: env.get("PORT").required().asPortNumber(),
  isMock: env.get("IS_MOCK").required().asString(),
  errorCodes: {
    duplicateKey: 11000,
  },
  operationTypes: {
    update: "update",
    insert: "insert",
  },
  prefetchAmount: 20,
};

export const collectionsMap = {
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
    [config.mongo.entityCollectionName]: {}, //TODO
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
// TODO move string config fields to the .env file
export default config;
