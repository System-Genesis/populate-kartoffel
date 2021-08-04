import config from "../../config";
import { OrganizationGroup } from "../../config/types";
import connectionChangeUpdate from "../connectionChangeUpdate";
import regularChangeUpdate from "../regularChangeUpdate";

export default async (updatedOrganizationGroup: OrganizationGroup, connectionUpdate: boolean, operationType: string) => {
  if (operationType == config.operationTypes.insert) {
    regularChangeUpdate(updatedOrganizationGroup);
  } else if (operationType == config.operationTypes.update) {
    if (connectionUpdate) {
      connectionChangeUpdate();
    } else {
      regularChangeUpdate(updatedOrganizationGroup);
    }
  }
};
