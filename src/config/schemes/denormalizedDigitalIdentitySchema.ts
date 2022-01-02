import { Model, Schema } from 'mongoose';
import config from '..';
import { DenormalizedDigitalIdentity } from '../types';
import denormalizedRoleSchema from './denormalizedRoleSchema';

export default new Schema<DenormalizedDigitalIdentity ,Model<DenormalizedDigitalIdentity> ,DenormalizedDigitalIdentity >(
  {
    type: String,
    source: String,
    mail: String,
    uniqueId: { type: String, unique: true, sparse: true },
    entityId: String,
    isRoleAttachable: Boolean,
    role: denormalizedRoleSchema,// added
    userPrincipalName: String,
  }, {
    versionKey: false,
    timestamps: true,
    collection: config.mongo.denormalizedDICollectionName
});
