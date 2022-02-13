import mongoose from "mongoose";

/**
 * makes a functions and commiting it with transaction
 * @param transactionFunction the function which going to be made in transuction
 */
export default async(transactionFunction: Promise<void>) =>{
    let session = await mongoose.startSession();
    session.startTransaction();
    
    await transactionFunction;

    await session.commitTransaction();

}