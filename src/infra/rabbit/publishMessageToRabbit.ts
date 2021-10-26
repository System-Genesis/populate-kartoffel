import { menash } from "menashmq";
import config from "../../config/index";

export default async (objectToSend: Object) => {
  await menash.send(config.rabbit.queueName, objectToSend).then(
    async () => {
      console.log(`change sent back to rabbit: ${JSON.stringify(objectToSend)}`);
    },
    async (err) => {
      console.error(err);
    }
  );
}
