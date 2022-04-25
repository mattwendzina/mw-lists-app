import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    console.log("Connecting...")
    const connection = await mongoose.connect(`mongodb+srv://mattwendzina:${process.env.PASSWORD}@cluster0.4mcqr.mongodb.net/common?retryWrites=true&w=majority`,
        { serverSelectionTimeoutMS: 3000 })
    console.log("Connected!")
    return connection
}

export const closeDatabaseConnection = () => {
    mongoose.connection.close(() => console.log("Connection closed"))
}
