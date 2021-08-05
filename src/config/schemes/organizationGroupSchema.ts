import { Model, Schema } from "mongoose";
import config from "..";
import { OrganizationGroup } from "../types";

export default new Schema<OrganizationGroup,Model<OrganizationGroup>, OrganizationGroup>(
  {
    // OG's Basic information
    id: { type: String, unique: true , sparse: true },
    name: String,
    source: String,
    // ancestors: [Schema.Types.ObjectId],
    // hierarchy: String,
    akaUnit: String,
    childrenNames: [String],//not in the populated collection
    status: String,
    directGroup: Schema.Types.ObjectId,
  },{ collection: config.mongo.organizationGroupCollectionName,
    versionKey: false,
    timestamps: true, 
});
