import mongoose from "mongoose";
import  dotenv  from "dotenv";


dotenv.config()

const dbConnect=async()=>{
    try{

        const connectDB=await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MONGODB connected successfully !! HOST on ${
            connectDB.connection.host
        }`)
    }catch(error){
        console.log("Mongodb connection failed", error)
        process.exit(1)
    }
}

export default dbConnect