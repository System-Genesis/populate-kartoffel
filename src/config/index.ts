import * as env from "env-var";
import * as dotenv from "dotenv";

dotenv.config();

const config = {
  mongo: {
    denormalizedEntityCollectionName: env.get("DENORMALIZED_ENTITY_COLLECTION_NAME").required().asString(),
    organizationGroupCollectionName: env.get("ORGANIZATION_GROUP_COLLECTION_NAME").required().asString(),
    digitalIdentityCollectionName: env.get("DIGITAL_IDENTITY_COLLECTION_NAME").required().asString(),
    entityCollectionName: env.get("ENTITY_COLLECTION_NAME").required().asString(),
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
  uniqueID:{
    [env.get("DIGITAL_IDENTITY_COLLECTION_NAME").required().asString()]: 'uniqueId',
    [env.get("ENTITY_COLLECTION_NAME").required().asString()]: 'id',
    [env.get("ROLE_COLLECTION_NAME").required().asString()]: 'roleId',
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
};

export default config;
