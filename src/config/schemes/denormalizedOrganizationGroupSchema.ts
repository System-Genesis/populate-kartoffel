import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedOrganizationGroup } from "../types";
import denormalizedRoleSchema from './denormalizedRoleSchema';
import denormalizedEntitySchema from './denormalizedEntitySchema';

const denormalizedOrganizationGroupSchema = new Schema<DenormalizedOrganizationGroup, Model<DenormalizedOrganizationGroup>, DenormalizedOrganizationGroup>(
  {
    _id: { type: Schema.Types.ObjectId, unique: true, sparse: true },
    name: String,
    source: String,
    ancestors: [String],//added
    hierarchy: String,//added
    akaUnit: String,
    status: String,
    diPrefix: String,
    directGroup: Schema.Types.ObjectId,
    isLeaf: Boolean,
    directChildrenRoles: [denormalizedRoleSchema],
    directChildrenEntities: [denormalizedEntitySchema]
  }, {
  collection: config.mongo.denormalizedOGCollectionName,
  versionKey: false,
  timestamps: true,
});

denormalizedOrganizationGroupSchema.add({
  directChildrenGroups: [denormalizedOrganizationGroupSchema]
})

export default denormalizedOrganizationGroupSchema;