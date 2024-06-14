import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
//here i have a special character in my password so it should be url encoded,that is Jerlin123@ after url encoding you will get Jerlin123%40,then you will have the mongodb
 await mongoose.connect(process.env.MONGO)
    .then(
        () => {
            console.log('MongoDB is Connected');

        }
    )
    .catch((err) => {
        console.log(err);
    });
const app = express();

//now say we want to listen to a port named 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});