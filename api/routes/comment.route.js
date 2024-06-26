import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
    createComment,
    getPostComments,
    likeComment,
    editComment,
    deleteComment,
  } from '../controllers/comment.controller.js';
const router = express.Router();


router.post('/create', verifyToken, createComment);
//after posting the comment now we want to get the comment.
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
export default router;

router.delete('/deleteComment/:commentId', verifyToken, deleteComment);