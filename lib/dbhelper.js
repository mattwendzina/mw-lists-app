import mongoose from "mongoose";

export const connectToDatabase = async () => {
  console.log("Connecting...");
  let connection;

  const mongoAtlasConnectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTERNAME}.4mcqr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

  const localConnectionString = `${process.env.MONGO_DB_LOCAL}${process.env.MONGO_DB_LOCAL_DATABASE}`;

  if (process.env.LOCAL_DB) {
    console.log("Try Connecting to Local DB...");
    connection = await mongoose.connect(localConnectionString);
    console.log("Connected!");
    return connection;
  } else {
    console.log("Try Connecting to Remote DB...");
    connection = await mongoose.connect(mongoAtlasConnectionString, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log("Connected!");
    return connection;
  }
};

export const closeDatabaseConnection = () => {
  mongoose.connection.close(() => console.log("Connection closed"));
};
