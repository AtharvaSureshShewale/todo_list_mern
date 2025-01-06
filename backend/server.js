const express=require('express');
const app=express();
const connectDB=require('./db');
const cors=require('cors');
app.use(cors());
const dotenv=require('dotenv');
//loading dotenv
dotenv.config();
const port=process.env.PORT;
const router1=require('./routes/TodoRoutes');
const router2=require('./routes/UserRoute');
app.use(express.json());
//connecting with db
connectDB();


//router
app.use('/api',router1);
app.use('/api',router2);

app.listen(port,()=>{
    console.log(`Your Application is runnning on port:${port}`);
})
