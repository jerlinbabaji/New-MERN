import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';//as we gave export default any name can be given
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

// app.get('/test',(req,res)=>{
//     res.json({message:'API is working'});
// });
//instead of the above line now i can use:
app.use('/api/user',userRoutes);//this is coming from the export of user.route.js