import mongoose from "mongoose";
import { locationSchema } from "../org.job/location.model.js";
import { qualificationEnum, genderEnum } from "../constants/enum.js";

// set rule
const seekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 155,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 155,
    unique: true,
  },
  location: locationSchema,
  gender: {
    type: String,
    enum: genderEnum,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
    enum: qualificationEnum,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
  },

  language: {
    type: [String],
    required: true,
  },
  divingLicenseCategory: {
    type: [String],
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// create table
export const Seeker = mongoose.model("Seeker", seekerSchema);
