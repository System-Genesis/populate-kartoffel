import { menash } from "menashmq";
import config from "../../config/index";
import logger from 'logger-genesis';

export default async (objectToSend: Object) => {
  await menash.send(config.rabbit.queueName, objectToSend, { persistent: true }).then(
    async () => {
      // console.log(`change sent back to rabbit: ${JSON.stringify(objectToSend)}`);
      logger.info(true, 'APP', 'Change sent back to rabbit', JSON.stringify(objectToSend));

    },
    async (err) => {
      console.error(err);
    }
  );
}
