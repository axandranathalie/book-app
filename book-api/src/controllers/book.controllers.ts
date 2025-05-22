import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/book.js';
import { Review } from '../models/review.js';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();

    // Calculate averageRating for each book
    const booksWithRatings = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ book: book._id });
        const ratings = reviews.map((r) => r.rating);
        const averageRating =
          ratings.length > 0
            ? ratings.reduce((a, b) => a + b, 0) / ratings.length
            : null;

        return {
          ...book.toObject(),
          averageRating,
        };
      })
    );

    res.status(200).json(booksWithRatings);
  } catch (error) {
    console.error('❌ Error finding books:', error);
    res.status(500).json({ error: 'Server error finding all books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid Book ID format'});
    return;
  }

  try {
    const book = await Book.findById(id).populate('reviews');

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    const reviews = await Review.find({ book: id });
    const ratings = reviews.map(r => r.rating);
    const averageRating = ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : null;

    res.status(200).json({
      ...book.toObject(),
      averageRating
    });

  } catch (error) {
    console.error('❌ Error fetching book:', error);
    res.status(500).json({ error: 'Server error fetching book' });
  }
}

export const createBook = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      author,
      genres,
      image,
      published_year
    } = req.body;

    const newBook = new Book({
      title,
      description,
      author,
      genres,
      image,
      published_year,
      reviews: []
    });

    const savedBook = await newBook.save();

    res.status(201).json({message: 'Book created!', savedBook});
  } catch (error) {
    console.error('❌ Error creating book:', error);
    res.status(500).json({ error: 'Server error creating book' });
  }
}

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  try {
    const book = await Book.findById(id);

    if (!book) {
      res.status(404).json({ message: 'Book not found'});
      return;
    }

    Object.assign(book, req.body);

    const updatedBook = await book.save();

    res.status(200).json({ message: 'Book succesfully updated', updatedBook });
  } catch (error) {
    console.error('❌ Error updating book:', error);
    res.status(500).json({ error: 'Server error updating book' });
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid Book ID'});
    return;
  }

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json({ message: 'Book succesfully deleted'});
  } catch (error) {
    console.error('❌ Error deleting book:', error);
    res.status(500).json({ error: 'Server error deleting book' });
  }
}