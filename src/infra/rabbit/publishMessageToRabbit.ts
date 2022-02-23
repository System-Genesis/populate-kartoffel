import { menash } from "menashmq";
import config from "../../config/index";

/**
 * publish an object to rabbit
 * @param objectToSend object that is going to be published in tabbit
 */
export default (objectToSend: Object) => {
  menash.send(config.rabbit.queueName, objectToSend, { persistent: true }).then(
    () => {
      console.log(
        `change sent back to rabbit: ${JSON.stringify(objectToSend)}`
      );
    },
    (err) => {
      console.error(err);
    }
  );
};
