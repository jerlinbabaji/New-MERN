import { nextTick } from "process";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';//say if somebody hacked our system then they will have access to our password too,so inorder to hash the passwords we use bcrypt
import { errorHandler } from '../utils/error.js';
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
    //instead of using control log u can use:
    // console.log(req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        //here we created an error,instead of this we can use error.js to handle such error messages
        // return res.status(400).json({message:'All fields are required'});
        //i dont know why but the below is not working,when given return it works
        return next(errorHandler(400, 'All fields are required'));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    //if we dont write try and catch here then if any errors are there it will be showing only here on the vs code terminal but not on the mongoose appliction.
    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        return next(error);
    }
    await newUser.save();
    res.json('Signup successful');
};

export const signin=async(req,res,next)=>{
    const{email,password}=req.body;

    if(!email || !password || email==='' || password===''){
        return next(errorHandler(400,'All fields are required'));
    }
    try {
        const validUser=await User.findOne ({email});//findone will do the search operation
        if(!validUser){
           return next(errorHandler(404,'User not found'));
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password);//comparesync will get the password hash it and compare it with the user's if error found then error message is printed,else we have to authenticate the user wbich is done using the jwt tokens.
        if(!validPassword){
            return next(errorHandler(400,'Invalid password'));
        }
        //jwt is based on a secret key that is unique to us,else our user cookies and be hijacked.
        const token =jwt.sign(
            {id: validUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET
        );
        const {password:pass,...rest}=validUser._doc;//if we dont write this line we are getting the password in the output log in hashed format,now we are not getting the password,and a cookie is also generated and nobody can understand it without our secret key
        res.status(200).cookie('access_token',token,
            {
            httpOnly:true
        })
        .json(rest );
    } catch (error) {
            next(error);
    }
}

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign(
          //add isAdmit here too
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
            username:
                //Jerlin Abraham=>jerlinabraham1552 
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id, isAdmin: newUser.isAdmin },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };