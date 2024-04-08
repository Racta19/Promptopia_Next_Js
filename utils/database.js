import mongoose from "mongoose";
let isConnected = false;

export const connectDatabase = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('MongoDb already connected');
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'share_prompt'
        });
        isConnected = true;
        console.log("MongoDb Connected")
    } catch (error) {
        console.log(error);
    }
}