import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDb = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.NEXT_MONGOURL) {
    return console.log("Missing mongo url");
  }

  if (isConnected) {
    return console.log("Already connected to mongodb");
  }

  try {
    await mongoose.connect(process.env.NEXT_MONGOURL);
    isConnected = true;
    console.log("Connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});
