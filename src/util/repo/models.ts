import mongoose from "mongoose";
import config from "../../config/index";
import denormalizedEntitySchema from "../../config/schemes/denormalizedEntitySchema";
import organizationGroupSchema from "../../config/schemes/organizationGroupSchema";
import digitalIdentitySchema from "../../config/schemes/digitalIdentitySchema";
import entitySchema from "../../config/schemes/entitySchema";
import roleSchema from "../../config/schemes/roleSchema";
import denormalizedOrganizationGroupSchema from "../../config/schemes/denormalizedOrganizationGroupSchema";
import denormalizedDigitalIdentitySchema from "../../config/schemes/denormalizedDigitalIdentitySchema";
import denormalizedRoleSchema from "../../config/schemes/denormalizedRoleSchema";

export const denormalizedEntityModel = mongoose.model(
  config.mongo.denormalizedEntityCollectionName,
  denormalizedEntitySchema
);

export const denormalizedDigitalIdentityModel = mongoose.model(
  config.mongo.denormalizedDICollectionName,
  denormalizedDigitalIdentitySchema
);

export const denormalizedRoleModel = mongoose.model(
  config.mongo.denormalizedRoleCollectionName,
  denormalizedRoleSchema
);

export const denormalizedOrganizationGroupModel = mongoose.model(
  config.mongo.denormalizedOGCollectionName,
  denormalizedOrganizationGroupSchema
);

export const organizationGroupModel = mongoose.model(
  config.mongo.organizationGroupCollectionName,
  organizationGroupSchema
);

export const digitalIdentityModel = mongoose.model(
  config.mongo.digitalIdentityCollectionName,
  digitalIdentitySchema
);

export const entityModel = mongoose.model(
  config.mongo.entityCollectionName,
  entitySchema
);

export const roleModel = mongoose.model(
  config.mongo.roleCollectionName,
  roleSchema
);
