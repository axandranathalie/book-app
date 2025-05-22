import { Types } from "mongoose";

export interface IBook {
  title: string;
  description: string;
  author: string;
  genres: string[];
  image: string;
  published_year: number;
  reviews: Types.ObjectId[];
}