import { Types } from "mongoose";

// This file defines the IReview interface, which represents a book review.
export interface IReview {
  name: string;
  content: string;
  rating: number;
  created_at: Date;
  book: Types.ObjectId[];
}
