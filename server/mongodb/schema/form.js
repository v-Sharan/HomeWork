import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FormSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is important"],
      unique: [true, "User already exists"],
    },
    register_no: {
      type: String,
      required: [true, "Register Number is required"],
      unique: [true, "Register Number already exists"],
    },
    githubLink: {
      type: String,
      required: [true, "GitHub Link is required"],
    },
    type: {
      type: String,
      required: [true, "Type of Home Work is required"],
    },
  },
  { timestamps: true }
);

export const Form = mongoose.model("Form", FormSchema);
