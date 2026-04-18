import PazzaDao from "./Dao.js";

export default function PazzaRoutes(app) {
  const dao = PazzaDao();

  // folders
  app.get("/api/courses/:cid/pazza/folders", async (req, res) => {
    const folders = await dao.findFoldersForCourse(req.params.cid);
    res.json(folders);
  });

  app.post("/api/courses/:cid/pazza/folders", async (req, res) => {
    const folder = await dao.createFolder(req.params.cid, req.body);
    res.json(folder);
  });

  app.put("/api/pazza/folders/:folderId", async (req, res) => {
    const folder = await dao.updateFolder(req.params.folderId, req.body);
    res.json(folder);
  });

  app.post("/api/courses/:cid/pazza/folders/delete", async (req, res) => {
    await dao.deleteFolders(req.params.cid, req.body.ids);
    res.sendStatus(200);
  });

  // posts
  app.get("/api/courses/:cid/pazza/posts", async (req, res) => {
    const posts = await dao.findPostsForCourse(req.params.cid);
    res.json(posts);
  });

  app.post("/api/courses/:cid/pazza/posts", async (req, res) => {
    const post = await dao.createPost({ ...req.body, courseId: req.params.cid });
    res.json(post);
  });

  app.put("/api/pazza/posts/:postId", async (req, res) => {
    const post = await dao.updatePost(req.params.postId, req.body);
    res.json(post);
  });

  app.delete("/api/pazza/posts/:postId", async (req, res) => {
    await dao.deletePost(req.params.postId);
    res.sendStatus(200);
  });

  app.post("/api/pazza/posts/:postId/view", async (req, res) => {
    const post = await dao.incrementView(req.params.postId);
    res.json(post);
  });

  // answers
  app.post("/api/pazza/posts/:postId/answers", async (req, res) => {
    const post = await dao.createAnswer(req.params.postId, req.body);
    res.json(post);
  });

  app.put("/api/pazza/posts/:postId/answers/:answerId", async (req, res) => {
    const post = await dao.updateAnswer(req.params.postId, req.params.answerId, req.body);
    res.json(post);
  });

  app.delete("/api/pazza/posts/:postId/answers/:answerId", async (req, res) => {
    const post = await dao.deleteAnswer(req.params.postId, req.params.answerId);
    res.json(post);
  });

  // follow ups
  app.post("/api/pazza/posts/:postId/followups", async (req, res) => {
    const post = await dao.createFollowup(req.params.postId, req.body);
    res.json(post);
  });

  app.put("/api/pazza/posts/:postId/followups/:followupId", async (req, res) => {
    const post = await dao.updateFollowup(req.params.postId, req.params.followupId, req.body);
    res.json(post);
  });

  app.delete("/api/pazza/posts/:postId/followups/:followupId", async (req, res) => {
    const post = await dao.deleteFollowup(req.params.postId, req.params.followupId);
    res.json(post);
  });

  //replies
  app.post("/api/pazza/posts/:postId/followups/:followupId/replies", async (req, res) => {
    const post = await dao.createReply(req.params.postId, req.params.followupId, req.body);
    res.json(post);
  });

  app.put("/api/pazza/posts/:postId/followups/:followupId/replies/:replyId", async (req, res) => {
    const post = await dao.updateReply(
      req.params.postId, req.params.followupId, req.params.replyId, req.body
    );
    res.json(post);
  });

  app.delete("/api/pazza/posts/:postId/followups/:followupId/replies/:replyId", async (req, res) => {
    const post = await dao.deleteReply(
      req.params.postId, req.params.followupId, req.params.replyId
    );
    res.json(post);
  });
}