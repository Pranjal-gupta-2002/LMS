import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter course title"],
    minLength: [4, "Minimum length of title should be 4 characters"],
    maxLength: [80, "Maximum length of title should be 80 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter course title"],
    minLength: [20, "Minimum length of title should be 20 characters"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  views:{
    type:Number,
    default:0,
  },
  noOfVideo:{
    type:Number,
    default:0,
  },
  category:{
    type:String,
    required:true,
  },
  createdBy:{
    type:String,
    required:[true,"Enter Course creator Name"]
  },
  craetedAt:{
    type:Date,
    default:Date.now,
  }
});

export const Course = mongoose.model("Course", schema);
