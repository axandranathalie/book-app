import express from 'express';
import { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook } from '../controllers/book.controllers.js';

import { verifyAccessToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);

router.post('/', verifyAccessToken, createBook);
router.patch('/:id', verifyAccessToken, updateBook);
router.delete('/:id', verifyAccessToken, deleteBook);

export default router;