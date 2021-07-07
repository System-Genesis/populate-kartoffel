import config from "./config/index";
import server from "./express/server";
import buildMocks from "./mocks/index";
import { initializeMongo } from "./util/mongo/initializeMongo";
import { initializeRabbit } from "./util/rabbit/initializeRabbit";
import { rabbitConsumer } from "./util/rabbit/initiateRabbitConsumer";

const main = async () => {
  await initializeMongo();
  
  await initializeRabbit();

  await rabbitConsumer();

  await server();

  //start dev environment
  if (config.isMock) await buildMocks();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
