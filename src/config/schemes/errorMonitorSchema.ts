import { Model, Schema } from "mongoose";
import config from "..";
import { ErrorsMonitor } from "../types";

export default new Schema<ErrorsMonitor, Model<ErrorsMonitor>, ErrorsMonitor>(
  {
    collectionName: String,
    errorMessages: [String],
    retries: Number,
    objectId: { type: Schema.Types.ObjectId, unique: true, sparse: true},
    description: Object,
  },{ 
    collection: config.mongo.errorsMonitorCollectionName,
    versionKey: false,
    timestamps: true,
  }
);
