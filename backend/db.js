const mongoose =require('mongoose');
const dotenv=require('dotenv');
dotenv.config();


const connectDB= async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
        const fetchData=mongoose.connection.db.collection("category");
        try{
            const tcData=await fetchData.find({}).toArray();
            global.taskCategory=tcData;
            // console.log(taskCategory);
        }catch(err){
            console.error(err);
        }
    }catch(err){
        console.error(err.message);
        process.exit;
    }
}

module.exports=connectDB;