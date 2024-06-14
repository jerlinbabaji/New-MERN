import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,//this means no user can be created without having the username 
        unique:true,//that means if the user uses a username of the previous user then we will get an error
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        //dosent matter if the password is not u nique
    },
}, {timestamps:true}//by adding this mongodb will automatically store the time of creation and time of update.
);

//creating the model:
const User=mongoose.model('User',userSchema);

export default User;