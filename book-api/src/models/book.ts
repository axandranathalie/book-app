import mongoose, { Schema, Document } from 'mongoose';
import { IBook } from '../types/IBook.js';

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String, required: true },
  genres: [{ type: String }],
  image: { type: String },
  published_year: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
}, {
  timestamps: true,
  optimisticConcurrency: true
});

export default mongoose.model<IBookModel>("Book", BookSchema);