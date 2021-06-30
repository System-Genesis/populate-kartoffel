import mongoose from "mongoose";

export default async (transactionFunction: Promise<void>) =>{
    let session = await mongoose.startSession();
    session.startTransaction();
    
    await transactionFunction;

    await session.commitTransaction();

}