import config from "../../config";
import { createDenormalizedDigitalIdentity } from "./createDenormalizedDigitalIdentity";
import { createDenormalizedEntity } from "./createDenormalizedEntity";
import { createDenormalizedOrganizationGroup } from "./createDenormalizedOrganizationGroup";
import { createDenormalizedRole } from "./createDenormalizedRole";

export default {
  [config.mongo.entityCollectionName]: createDenormalizedEntity,
  [config.mongo.digitalIdentityCollectionName]: createDenormalizedDigitalIdentity,
  [config.mongo.organizationGroupCollectionName]: createDenormalizedOrganizationGroup,
  [config.mongo.roleCollectionName]: createDenormalizedRole,
};
