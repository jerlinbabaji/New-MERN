import { nextTick } from "process";
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';//say if somebody hacked our system then they will have access to our password too,so inorder to hash the passwords we use bcrypt
import { errorHandler } from '../utils/error.js';
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
    //if we dont write try and catch here then if any errora are there it will be showing only here on the vs code terminal but not on the mongoose appliction.
    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        // res.status(500).json({message:error.message});
        next(error);
    }
    await newUser.save();
    res.json('Signup successful');
};