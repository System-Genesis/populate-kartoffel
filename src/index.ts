import config from "./config/index";
import buildMocks from "./mocks/index";
import { recoveryScript } from "./util/recoveryScript";
import { initializeMongo } from "./util/mongo/initializeMongo";
import { initializeRabbit } from "./util/rabbit/initializeRabbit";
import { rabbitConsumer } from "./util/rabbit/initiateRabbitConsumer";

const main = async () => {
  await initializeMongo();
  
  await initializeRabbit();

  await rabbitConsumer();

  //start dev environment
  if (config.isMock) await buildMocks();
  if(config.iaRecoveryScript) await recoveryScript()
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

