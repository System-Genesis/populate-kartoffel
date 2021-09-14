import * as env from "env-var";
import * as dotenv from "dotenv";

dotenv.config();

export const config = {
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
        ? env.get("MONGO_PROTOCOL").required().asString() +
          env.get("MONGODB_USER_NAME").asString() +
          ":" +
          env.get("MONGODB_PASSWORD").asString() +
          "@" +
          env.get("MONGO_URN").required().asString()
        : env.get("MONGO_PROTOCOL").required().asString() +
          env.get("MONGO_URN").required().asString(),
  },
  rabbit: {
    uri: env.get("RABBIT_URI").required().asString(),
    queueName: env.get("RABBIT_QUEUE_NAME").required().asString(),
  },
  port: env.get("PORT").required().asPortNumber(),
  isMock: env.get("IS_MOCK").required().asBool(),
  iaRecoveryScript: env.get("IS_RECOVERY_SCRIPT").required().asBool(),
  errorCodes: {
    duplicateKey: 11000,
  },
  operationTypes: {
    update: "update",
    insert: "insert",
    // delete: "delete",
  },
  prefetchAmount: 20,
};

// TODO move string config fields to the .env file
export default config;
