import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedOrganizationGroup } from "../types";

export default new Schema<DenormalizedOrganizationGroup,Model<DenormalizedOrganizationGroup>, DenormalizedOrganizationGroup>(
  {
    id: { type: String, unique: true , sparse: true },
    name: String,
    source: String,
    ancestors: [String],//added
    hierarchy: String,//added
    akaUnit: String,
    status: String,
    directGroup: String,
  },{ 
    collection: config.mongo.denormalizedOGCollectionName,
    versionKey: false,
    timestamps: true, 
});
