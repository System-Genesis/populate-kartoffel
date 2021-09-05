import config from "../config";
import collectionsMap from "../config/collectionsMap";
import regularChangeUpdate from "../service/regularChangeUpdate";
import { digitalIdentityModel, entityModel, organizationGroupModel, roleModel } from "./repo/models";
import { find } from "./repo/repository";

export const recovryScript = async () => {
  const allDb = {
    [config.mongo.entityCollectionName]: await find(entityModel, {}),
    [config.mongo.digitalIdentityCollectionName]: await find(digitalIdentityModel, {}),
    [config.mongo.organizationGroupCollectionName]: await find(organizationGroupModel, {}),
    [config.mongo.roleCollectionName]: await find(roleModel, {}),
  };

  for (const collectionField in allDb) {
    allDb[collectionField].forEach(dataObject => {
      regularChangeUpdate(dataObject[collectionsMap.uniqueID[collectionField]], collectionField);
    });
  }
};
