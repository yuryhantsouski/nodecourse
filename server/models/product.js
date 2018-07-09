import mongoose, { Schema } from 'mongoose';

import timestamps from 'mongoose-timestamp';

export const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  brand: {
    type: String,
    trim: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  options: {
    type: Array
  }
},
{ collection: 'products' },
);

ProductSchema.plugin(timestamps);

module.exports = exports = mongoose.model('Product', ProductSchema);
