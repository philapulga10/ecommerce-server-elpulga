import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);

    console.log(`Mongodb connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongodb error ${error}`.bgRed.white);
  }
};

export default connectDB;
