import mongoose, { Schema } from 'mongoose';

import timestamps from 'mongoose-timestamp';

export const CitySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  },
  capital: {
    type: Boolean,
    default: false
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    long: {
      type: Number,
      required: true
    }
  }
},
{ collection: 'cities' },
);

CitySchema.plugin(timestamps);

module.exports = exports = mongoose.model('City', CitySchema);
