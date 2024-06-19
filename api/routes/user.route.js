import express from 'express';
import { test,updateUser ,deleteUser,signout} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();
//everytime writing like below is not a good practice therefore we create a controller:
// router.get('/test', (req, res) => {
//     res.json({ message: 'API is working' });
// });
router.get('/test',test);
//first we will verify the token ,if the token is verified ,the user is going to be added to the request in verifyuser.js
router.put('/update/:userId',verifyToken ,updateUser);
//the above userid,we can get by req.params(it's basically the id we got from insonmia when we create the user)
router.delete('/delete/:userId',verifyToken,deleteUser);

//if that id is equal to the id we got when send request in insonmia in our vs code then the user is a valid user
router.post('/signout',signout);
export default router;
