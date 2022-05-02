import mongoose from 'mongoose';

export const connectToDatabase = async () => {
    console.log("Connecting...")
    let connection

    if (process.env.LOCAL_DB) {
        console.log("Try Connecting to Local DB...")
        connection = await mongoose.connect(`mongodb://127.0.0.1:27017/listsApp`)
        console.log("Connected!")
        return connection
    } else {
        console.log("Try Connecting to Remote DB...")
        connection = await mongoose.connect(`mongodb+srv://mattwendzina:${process.env.PASSWORD}@cluster0.4mcqr.mongodb.net/common?retryWrites=true&w=majority`,
            { serverSelectionTimeoutMS: 3000 })
        console.log("Connected!")
        return connection
    }
}

export const closeDatabaseConnection = () => {
    mongoose.connection.close(() => console.log("Connection closed"))
}
