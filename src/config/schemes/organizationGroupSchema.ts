import { Model, Schema } from "mongoose";
import config from "..";
import { OrganizationGroup } from "../types";

export default new Schema<OrganizationGroup,Model<OrganizationGroup>, OrganizationGroup>(
  {
    _id: {type: Schema.Types.ObjectId, unique: true, sparse: true },
    name: String,
    source: String,
    akaUnit: String,
    diPrefix: String,
    childrenNames: [String],//not in the populated collection
    status: String,
    directGroup: Schema.Types.ObjectId,
  },{ 
    collection: config.mongo.organizationGroupCollectionName,
    versionKey: false,
    timestamps: true, 
});
