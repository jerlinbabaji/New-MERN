import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  //we need to verify whose token is it that is to verify the token.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    //first we will verify the token ,if the token is verified ,the user is going to be added to the request.
    //then we will go to the next() whic is updateuser,line 11-->router.put('/update:userId',verifyToken ,updateUser);
    //then we will have access to the user in user.sontroller.js
    req.user = user;
    next();
  });
};