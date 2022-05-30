import { Description } from "../config/types";
import { errorsMonitorModel } from "../infra/repo/models";
import { create, findOne, findOneAndUpdate } from "../infra/repo/repository";

export default async (id, description: Description, err) => {
  let errorMonitorObject = await findOne(errorsMonitorModel, { objectId: id });
  if (!errorMonitorObject) {
    errorMonitorObject = {
      collectionName: description.ns.coll,
      errorMessages: [err.message],
      objectId: description.documentKey._id,
      description: description,
    };
    await create(errorsMonitorModel, errorMonitorObject);
  } else {
    errorMonitorObject.errorMessages.push(err.message)
    await findOneAndUpdate(errorsMonitorModel, {objectId: id}, errorMonitorObject)
  }
};
