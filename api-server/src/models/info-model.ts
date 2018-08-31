import * as mongoose from 'mongoose';

export interface IInfo extends mongoose.Document {
  lat: number,
  lng: number,
  contents: string,
  code: number
}

const InfoSchema = new mongoose.Schema ({
  lat: Number,
  lng: Number,
  contents: String,
  code: Number,
  created : {
    type : Date,
    default : Date.now
  }
});

mongoose.model('Info', InfoSchema);

export const Info = mongoose.model('Info');
