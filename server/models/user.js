import mongoose, { Schema } from 'mongoose';

import timestamps from 'mongoose-timestamp';

export const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
},
{ collection: 'users' },
);

UserSchema.plugin(timestamps);

module.exports = exports = mongoose.model('User', UserSchema);
