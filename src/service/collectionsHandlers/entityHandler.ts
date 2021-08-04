import connectionChangeUpdate from "../connectionChangeUpdate";
import regularChangeUpdate from "../regularChangeUpdate";
import config from "../../config/index";
import { Entity } from "../../config/types";

export default async (updetedEntity: Entity, connectionUpdate: boolean, operationType: string) => {
  if (operationType == config.operationTypes.insert) {
    regularChangeUpdate(updetedEntity);
  } else if (operationType == config.operationTypes.update) {
    if (connectionUpdate) {
      connectionChangeUpdate();
    } else {
      regularChangeUpdate(updetedEntity);
    }
  }
};
