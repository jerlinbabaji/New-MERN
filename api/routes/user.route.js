import express from 'express';
import { test } from '../controllers/user.controller.js';
const router = express.Router();

//everytime writing like below is not a good practice therefore we create a controller:
// router.get('/test', (req, res) => {
//     res.json({ message: 'API is working' });
// });
router.get('/test',test);

export default router;
