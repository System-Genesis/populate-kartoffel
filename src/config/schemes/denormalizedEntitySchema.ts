import { Model, Schema } from 'mongoose';
import { DenormalizedEntity } from '../types';
import digitalIdentitySchema from './digitalIdentitySchema';

export default new Schema<DenormalizedEntity,Model<DenormalizedEntity>, DenormalizedEntity>({
    id: String,
    displayName: String,
    entityType: String, // enum
    identityCard: String,
    personalNumber: String,
    serviceType: String,
    firstName: String,
    lastName: String,
    akaUnit: String,
    status: String,
    dischargeDate: Date,
    rank: String, // enum
    mail: String,
    job: String,
    phone: String,
    mobilePHone: String,
    address: String,
    clearance: String, // String,of number - enum
    sex: String,
    birthDate: Date,
    digitalIdentities: [digitalIdentitySchema],
});
