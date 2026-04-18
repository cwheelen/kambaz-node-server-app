import mongoose from "mongoose";
import { postSchema, folderSchema } from "./Schema.js";

const PostModel = mongoose.model("PazzaPost", postSchema);
const FolderModel = mongoose.model("PazzaFolder", folderSchema);

export { PostModel, FolderModel };