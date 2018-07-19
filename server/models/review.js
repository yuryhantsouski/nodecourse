import mongoose, { Schema } from 'mongoose';

import timestamps from 'mongoose-timestamp';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const ReviewSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: true
  },
  productId: {
    type: ObjectId,
    required: true
  }
},
{ collection: 'reviews' },
);

ReviewSchema.plugin(timestamps);

module.exports = exports = mongoose.model('Review', ReviewSchema);
