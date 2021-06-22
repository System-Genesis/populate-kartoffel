import { Schema } from 'mongoose';

export default new Schema({
    // OG's Basic information
    id: String,
    name: String,
    ancestors: [String],
    hierarchy: String,
    akaUnit: String,
    status: String,
    isLeaf: Boolean,
    createdAt: Date,
    updatedAt: Date,
});
