import { Model, Schema } from 'mongoose';
import { DenormalizedDigitalIdentity } from '../types';
import roleSchema from './roleSchema';

export default new Schema<DenormalizedDigitalIdentity ,Model<DenormalizedDigitalIdentity> ,DenormalizedDigitalIdentity >({
    type: String,
    source: String,
    mail: String,
    uniqueId: { type: String, unique: true, sparse: true },
    entityId: String,
    isRoleAttachable: Boolean,
    role: roleSchema,
  }, {
    versionKey: false,
    timestamps: true
});
