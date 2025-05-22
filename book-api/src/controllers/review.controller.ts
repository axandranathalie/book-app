// === IMPORTS ===
import { Request, Response } from 'express'
import { Review } from '../models/review.js'
import { IReview } from '../types/IReview.js'
import { Document, Types } from 'mongoose'
import Book from '../models/book.js'


// === HJÄLPFUNKTION FÖR ATT UPPDATERA SNITTBETYGET ===
async function updateBookAverageRating(bookId: string) {
  const reviews = await Review.find({ book: bookId })

  if (reviews.length === 0) {
    await Book.findByIdAndUpdate(bookId, { rating: 0 })
    return
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  const average = total / reviews.length

  await Book.findByIdAndUpdate(bookId, { rating: average })
}

/** === GET ALL REVIEWS === */
export async function getAllReviews(_req: Request, res: Response) {
  try {
    const reviews = await Review.find().populate('book') 
    res.status(200).json(reviews)
  } catch (error) {
    console.error('❌ Error fetching reviews:', error)
    res.status(500).json({ error: 'Server failed to fetch reviews' })
  }
}

/** === GET REVIEW BY ID === */
export async function getReviewById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const review = await Review.findById(id).populate('book')
    if (!review) {
      res.status(404).json({ error: 'Review not found' })
      return
    }
    res.status(200).json(review)
  } catch (error) {
    console.error('❌ Error fetching review by ID:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

/** === CREATE NEW REVIEW === */
export async function createReview(req: Request, res: Response) {
  const { name, content, rating, book } = req.body

  try {
    const bookExists = await Book.findById(book)
    if (!bookExists) {
      res.status(404).json({ error: 'Book not found' })
      return
    }

    const newReview = new Review({
      name,
      content,
      rating,
      book,
      created_at: new Date(),
    })

    // Lägg till referensen till recensionen i boken
    bookExists.reviews.push(newReview._id as Types.ObjectId)
    await bookExists.save()

    await newReview.save()
    res.status(201).json(newReview)
  } catch (error) {
    console.error('❌ Error creating review:', error)
    res.status(400).json({ error: 'Invalid review data' })
  }
}

/** === UPDATE REVIEW BY ID === */
export async function updateReviewById(req: Request, res: Response) {
  const { id } = req.params
  const { name, content, rating } = req.body

  try {
    const review = await Review.findById(id)
    if (!review) {
      res.status(404).json({ error: 'Review not found' })
      return
    }

    if (name) review.name = name
    if (content) review.content = content
    if (rating !== undefined) review.rating = rating

    await review.save()
    res.status(200).json({ message: 'Review updated successfully', review })
  } catch (error) {
    console.error('❌ Error updating review:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

/** === DELETE REVIEW BY ID === */
export async function deleteReviewById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const review = await Review.findById(id)
    if (!review) {
      res.status(404).json({ error: 'Review not found' })
      return
    }

    // Ta bort recensionens referens från bokens reviews-array
    await Book.findByIdAndUpdate(review.book, {
      $pull: { reviews: review._id }
    })

    // Ta bort recensionen
    await Review.findByIdAndDelete(id)
    res.status(200).json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error('❌ Error deleting review:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

/** === GET REVIEWS FOR A SPECIFIC BOOK === */
export async function getReviewsByBookId(req: Request, res: Response) {
  const { bookId } = req.params;

  try {
    const reviews = await Review.find({ book: bookId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('❌ Error fetching reviews for book:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

