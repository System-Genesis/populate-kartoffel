import { menash } from "menashmq";
import config from "../../config/index";

/**
 * publish an object to rabbit 
 * @param objectToSend object that is going to be published in tabbit
 */
export default async(objectToSend: Object) =>{
  await menash.send(config.rabbit.queueName, objectToSend, {persistent: true}).then(
    async () => {
      console.log(`change sent back to rabbit: ${JSON.stringify(objectToSend)}`);
    },
    async (err) => {
      console.error(err);
    }
  );
}
