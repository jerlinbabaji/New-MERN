import express from 'express';
const app=express();

//now say we want to listen to a port named 3000
app.listen(3000,()=>{
    console.log('Server is running on port 3000!');
});