import config from "../../config";
import { craeteDenormalizedDigitalIdentity } from "./craeteDenormalizedDigitalIdentity";
import { craeteDenormalizedEntity } from "./craeteDenormalizedEntity";
import { craeteDenormalizedOrganizationGroup } from "./craeteDenormalizedOrganizationGroup";
import { craeteDenormalizedRole } from "./craeteDenormalizedRole";

export default {
  [config.mongo.entityCollectionName]: craeteDenormalizedEntity,
  [config.mongo.digitalIdentityCollectionName]: craeteDenormalizedDigitalIdentity,
  [config.mongo.organizationGroupCollectionName]: craeteDenormalizedOrganizationGroup,
  [config.mongo.roleCollectionName]: craeteDenormalizedRole,
};
