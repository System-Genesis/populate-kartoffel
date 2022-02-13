import menash, { ConsumerMessage } from "menashmq";
import { MyChangeEvent } from "../../config/types";
import config from "../../config/index";
import startUpdateProcess from "../../service/startUpdateProcess";
import isCriticalError from "../../util/isCriticalError";
import errorHandler from "../../util/errorHandler";
import publishMessageToRabbit from "./publishMessageToRabbit";

/**
 * activating the rabbit consumer and starting the update process
 */
export async function rabbitConsumer() {
  await menash.queue(config.rabbit.queueName).activateConsumer(
    async (msg: ConsumerMessage) => {
      const changeEventObject = msg.getContent() as MyChangeEvent;
      console.log(
        `change accepted from rabbit: ${JSON.stringify(changeEventObject)}`
      );
      const changedObjectId = changeEventObject.description.documentKey?._id;
      try {
        await startUpdateProcess(changeEventObject);
        msg.ack();
      } catch (err) {
        if (await isCriticalError(changeEventObject)) {
          await errorHandler(changedObjectId, changeEventObject.description, err);
          console.log(`critical error in the object with the id: ${changedObjectId}`);
          msg.ack();
        } else {
          msg.ack();
          changeEventObject.populateKartoffelRetries =
            changeEventObject.populateKartoffelRetries
              ? changeEventObject.populateKartoffelRetries + 1
              : 1;
          await publishMessageToRabbit(changeEventObject);
          console.error(err);
        }
      }
    },
    { noAck: false }
  );
}
