import mongoose from "mongoose";
import config from "../../config/index";
import denormalizedEntitySchema from "../../config/schemes/denormalizedEntitySchema";
import organizationGroupSchema from "../../config/schemes/organizationGroupSchema";
import digitalIdentitySchema from "../../config/schemes/digitalIdentitySchema";
import entitySchema from "../../config/schemes/entitySchema";
import roleSchema from "../../config/schemes/roleSchema";

export const denormalizedEntityModel = mongoose.model(
  config.mongo.denormalizedEntityCollectionName,
  denormalizedEntitySchema
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


