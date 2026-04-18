import { PostModel, FolderModel } from "./Model.js";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_FOLDERS = [
  "hw1", "hw2", "hw3", "hw4", "hw5", "hw6",
  "project", "exam", "logistics", "other", "office_hours",
];

export default function PazzaDao() {

  const findFoldersForCourse = async (courseId) => {
    let folders = await FolderModel.find({ courseId });
    if (folders.length === 0) {
      folders = await FolderModel.insertMany(
        DEFAULT_FOLDERS.map((name) => ({ _id: uuidv4(), courseId, name }))
      );
    }
    return folders;
  };

  const createFolder = async (courseId, folder) => {
    const newFolder = new FolderModel({ _id: uuidv4(), courseId, name: folder.name });
    return newFolder.save();
  };

  const updateFolder = async (folderId, updates) => {
    return FolderModel.findByIdAndUpdate(folderId, { $set: updates }, { new: true });
  };

  const deleteFolders = async (courseId, ids) => {
    return FolderModel.deleteMany({ courseId, _id: { $in: ids } });
  };

  const findPostsForCourse = (courseId) => {
    return PostModel.find({ courseId });
  };

  const createPost = (post) => {
    const newPost = new PostModel({ _id: uuidv4(), ...post });
    return newPost.save();
  };

  const updatePost = (postId, updates) => {
    return PostModel.findByIdAndUpdate(postId, { $set: updates }, { new: true });
  };

  const deletePost = (postId) => {
    return PostModel.findByIdAndDelete(postId);
  };

  const incrementView = (postId) => {
    return PostModel.findByIdAndUpdate(postId, { $inc: { views: 1 } }, { new: true });
  };

  const createAnswer = async (postId, answer) => {
    const post = await PostModel.findById(postId);
    if (!post) return null;
    post.studentAnswers.push({ _id: uuidv4(), ...answer });
    return post.save();
  };

  const updateAnswer = async (postId, answerId, updates) => {
    const post = await PostModel.findById(postId);
    if (!post) return null;
    const ans = post.studentAnswers.id(answerId);
    if (ans) Object.assign(ans, updates);
    return post.save();
  };

  const deleteAnswer = async (postId, answerId) => {
    const post = await PostModel.findById(postId);
    if (!post) return null;
    post.studentAnswers = post.studentAnswers.filter(
      (a) => a._id.toString() !== answerId
    );
    return post.save();
  };

  const createFollowup = async (postId, followup) => {
    const post = await PostModel.findById(postId);
    if (!post) return null;
    post.followups.push({ _id: uuidv4(), ...followup });
    return post.save();
  };

  const updateFollowup = async (postId, followupId, updates) => {
    const post = await PostModel.findById(postId);
    if (!post) return null;
    const fud = post.followups.id(followupId);
    if (fud) Object.assign(fud, updates);
    return post.save();
  };

  const deleteFollowup = async (postId, followupId) => {
    const post = await PostModel.findById(postId);
    if (!post) return null;
    post.followups = post.followups.filter(
      (f) => f._id.toString() !== followupId
    );
    return post.save();
  };

  const createReply = async (postId, followupId, reply) => {
    const post = await PostModel.findById(postId);
    if (!post) return null;
    const fud = post.followups.id(followupId);
    if (!fud) return null;
    fud.replies.push({ _id: uuidv4(), ...reply });
    return post.save();
  };

  const updateReply = async (postId, followupId, replyId, updates) => {
    const post = await PostModel.findById(postId);
    if (!post) return null;
    const fud = post.followups.id(followupId);
    if (!fud) return null;
    const reply = fud.replies.id(replyId);
    if (reply) Object.assign(reply, updates);
    return post.save();
  };

  const deleteReply = async (postId, followupId, replyId) => {
    const post = await PostModel.findById(postId);
    if (!post) return null;
    const fud = post.followups.id(followupId);
    if (!fud) return null;
    fud.replies = fud.replies.filter((r) => r._id.toString() !== replyId);
    return post.save();
  };

  return {
    findFoldersForCourse, createFolder, updateFolder, deleteFolders,
    findPostsForCourse, createPost, updatePost, deletePost, incrementView,
    createAnswer, updateAnswer, deleteAnswer,
    createFollowup, updateFollowup, deleteFollowup,
    createReply, updateReply, deleteReply,
  };
}