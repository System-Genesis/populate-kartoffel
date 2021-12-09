import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedOrganizationGroup } from "../types";

export default new Schema<DenormalizedOrganizationGroup,Model<DenormalizedOrganizationGroup>, DenormalizedOrganizationGroup>(
  {
    _id: {type: Schema.Types.ObjectId, unique: true, sparse: true },
    name: String,
    source: String,
    ancestors: [String],//added
    hierarchy: String,//added
    akaUnit: String,
    status: String,
    diPrefix: String,
    directGroup: Schema.Types.ObjectId,
    isLeaf: Boolean,
  },{ 
    collection: config.mongo.denormalizedOGCollectionName,
    versionKey: false,
    timestamps: true, 
});
