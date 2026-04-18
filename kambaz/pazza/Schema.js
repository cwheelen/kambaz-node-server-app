import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  authorId: String,
  authorName: String,
  text: String,
  createdAt: String,
});

const followupSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  authorId: String,
  authorName: String,
  text: String,
  resolved: { type: Boolean, default: false },
  createdAt: String,
  replies: [replySchema],
});

const answerSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  authorId: String,
  authorName: String,
  authorRole: String,
  content: String,
  createdAt: String,
});

const postSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    courseId: { type: String, required: true },
    type: { type: String, enum: ["question", "note"], default: "question" },
    postTo: { type: String, enum: ["class", "individual"], default: "class" },
    visibleTo: [String],
    folders: [String],
    summary: String,
    details: String,
    authorId: String,
    authorName: String,
    authorRole: String,
    createdAt: String,
    views: { type: Number, default: 0 },
    studentAnswers: [answerSchema],
    instructorAnswer: { type: answerSchema, default: null },
    followups: [followupSchema],
  },
  { collection: "pazza_posts" }
);

const folderSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    courseId: { type: String, required: true },
    name: { type: String, required: true },
  },
  { collection: "pazza_folders" }
);

export { postSchema, folderSchema };