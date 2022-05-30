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
import errorMonitorSchema from "../../config/schemes/errorMonitorSchema";

denormalizedEntitySchema.index({
  personalNumber: 1,
},
{
  sparse: true
});
denormalizedEntitySchema.index({
  entityType: 1,
});
denormalizedEntitySchema.index({
  rank: 1,
});
denormalizedEntitySchema.index({
  updatedAt: 1,
});
denormalizedEntitySchema.index({
  hierarchy: 1,
});
denormalizedEntitySchema.index({
  directGroup: 1,
});
denormalizedEntitySchema.index({
  hierarchyIds: 1,
});
denormalizedEntitySchema.index({
  goalUserId: 1,
},
{
  sparse: true
});
denormalizedEntitySchema.index({
  identityCard: 1,
},
{
  sparse: true
});
denormalizedEntitySchema.index({
  employeeId: 1,
},
{
  sparse: true
});
denormalizedEntitySchema.index({
  employeeNumber: 1,
  organization: 1,
},
{
  sparse: true
});
denormalizedOrganizationGroupSchema.index({
  ancestors: 1,
});
denormalizedOrganizationGroupSchema.index({
  updatedAt: 1,
});
denormalizedOrganizationGroupSchema.index({
  hierarchy: 1,
});
denormalizedOrganizationGroupSchema.index({
  source: 1,
});
denormalizedOrganizationGroupSchema.index({
  directGroup: 1,
});


denormalizedDigitalIdentitySchema.index({
  source: 1,
});

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

export const errorsMonitorModel = mongoose.model(
  config.mongo.errorsMonitorCollectionName,
  errorMonitorSchema
)
