import config from "./config/index";
import buildMocks from "./mocks/index";
import { recoveryScript } from "./util/recoveryScript";
import { initializeMongo } from "./infra/mongo/initializeMongo";
import { initializeRabbit } from "./infra/rabbit/initializeRabbit";
import { rabbitConsumer } from "./infra/rabbit/initiateRabbitConsumer";
import server from "./infra/express/server";

const main = async () => {
  await initializeMongo();
  
  await initializeRabbit();

  await rabbitConsumer();

  await server();

  //start dev environment
  if (config.isMock) await buildMocks();
  if(config.iaRecoveryScript) await recoveryScript()
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

