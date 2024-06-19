import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js';
// Controllers basically have all the logic and functions 
export const test = (req, res) => {
    res.json({ message: 'API is working!' });
}

export const updateUser = async (req, res, next) => {
    try {
        // Check if the user is allowed to update this user
        if (req.user.id !== req.params.userId) {
            return next(errorHandler(403, 'You are not allowed to update this user'));
        }

        // Validate and hash password if provided
        if (req.body.password) {
            if (req.body.password.length < 6) {
                return next(errorHandler(400, 'Password must be at least 6 characters'));
            }
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // Validate username if provided
        if (req.body.username) {
            if (req.body.username.length < 7 || req.body.username.length > 20) {
                return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
            }
            if (req.body.username.includes(' ')) {
                return next(errorHandler(400, 'Username cannot contain spaces'));
            }
            if (req.body.username !== req.body.username.toLowerCase()) {
                return next(errorHandler(400, 'Username must be lowercase'));
            }
            if (!/^[a-zA-Z0-9]+$/.test(req.body.username)) {
                return next(errorHandler(400, 'Username can only contain letters and numbers'));
            }
        }

        // Update user details in the database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }

        // Exclude password from the response
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error+"hhhh");
    }
};

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this user'));
    }
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json('User has been deleted');
    } catch (error) {
      next(error);
    }
  };