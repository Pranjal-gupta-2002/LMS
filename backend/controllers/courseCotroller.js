import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import { Stats } from "../models/Stats.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary";

export const getAllCourses = catchAsyncError(async (req, res, next) => {

  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  const courses = await Course.find({
    title:{
      $regex:keyword,
      $options:"i"
    },
    category:{
      $regex:category,
      $options:"i"
    }
  }).select("+lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  const file = req.file;
console.log(file);
  const fileUri = getDataUri(file);
  console.log(fileUri);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  if (!title || !description || !category || !createdBy) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Course Created Successfully",
  });
});
export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
  }
  await course.deleteOne();

  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  course.views += 1;
  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

export const addLecture = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;

  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  // upload files here
  const file = req.file;
  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  course.noOfVideo = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture Added Successfully",
  });
});

export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const lecture = course.lectures.find(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });
  course.lectures = course.lectures.filter(
    (lecture) => lecture._id.toString() !== lectureId.toString()
  );
  course.noOfVideo = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture Deleted Successfully",
  });
});


Course.watch().on("change",async()=>{
  const stats = await Stats.find({}).sort({createdAt:"desc"}).limit(1);

  const courses  = await Course.find({});

  let totalViews = 0;
  courses.forEach((course)=>{
    totalViews += course.views;
  })

  stats[0].views = totalViews;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save()

})
