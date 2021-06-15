import * as env from "env-var";
import * as dotenv from "dotenv";

dotenv.config();

const config = {
  mongo: {
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
};

export default config;
