import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
    createComment,
    getPostComments,
  } from '../controllers/comment.controller.js';
const router = express.Router();


router.post('/create', verifyToken, createComment);
//after posting the comment now we want to get the comment.
router.get('/getPostComments/:postId', getPostComments);
export default router;