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
    errorsMonitorCollectionName: env.get("ERRORS_COLLECTION_NAME").required().asString(),
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
    retryOptions: {
      minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
      retries: env.get('RABBIT_RETRY_RETRIES').default(10).asIntPositive(),
      factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
    },
  },
  port: env.get("PORT").required().asPortNumber(),
  isMock: env.get("IS_MOCK").required().asBool(),
  iaRecoveryScript: env.get("IS_RECOVERY_SCRIPT").required().asBool(),
  recoveryCollectionsArray: env.get("RECOVERY_COLLECTIONS_ARRAY").required().asArray(),
  errorCodes: {
    duplicateKey: 11000,
  },
  operationTypes: {
    update: "update",
    insert: "insert",
    delete: "delete",
  },
  prefetchAmount: env.get("PREFETCH_AMOUNT").asInt() ? env.get("PREFETCH_AMOUNT").asInt() : 20,
  apiPassword: env.get("API_PASSWORD").required().asString(),
  retriesBeforeCriticalErrorAlert: env.get("RETRIES").required().asInt(),
  pictures: {
    baseUrl: env.get("BASE_URL").required().asUrlString(),
    urlSuffix: env.get("URL_SUFFIX").required().asString(),
  }
};

// TODO move string config fields to the .env file
export default config;
