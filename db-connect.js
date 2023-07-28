import mongoose from "mongoose";

export const db_connect = async () => {
  try {
    await mongoose.connect(
      encodeURI(
        "mongodb+srv://arun:arun1nly1@school.b6qkdnb.mongodb.net/jobfinder?retryWrites=true&w=majority"
      )
    );
    console.log("DB connected: OK");
  } catch (error) {
    console.log("DB connection :failed");
    console.log(error.message);
  }
};
