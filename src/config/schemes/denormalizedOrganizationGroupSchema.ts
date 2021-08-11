import { Model, Schema } from "mongoose";
import config from "..";
import { DenormalizedOrganizationGroupSchema } from "../types";

export default new Schema<DenormalizedOrganizationGroupSchema,Model<DenormalizedOrganizationGroupSchema>, DenormalizedOrganizationGroupSchema>(
  {
    id: { type: String, unique: true , sparse: true },
    name: String,
    source: String,
    ancestors: [Schema.Types.ObjectId],//added
    hierarchy: String,//added
    akaUnit: String,
    status: String,
    directGroup: Schema.Types.ObjectId,
  },{ collection: config.mongo.organizationGroupCollectionName,
    versionKey: false,
    timestamps: true, 
});
