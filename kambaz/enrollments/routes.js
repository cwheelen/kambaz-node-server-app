import EnrollmentsDao from "./dao.js";
import CoursesDao from "../courses/dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const coursesDao = CoursesDao(db);

  const findAllCoursesWithEnrollmentStatus = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const allCourses = coursesDao.findAllCourses();
    res.json(allCourses);
  };

  const enrollCurrentUserInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    dao.enrollUserInCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  const unenrollCurrentUserFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  app.get("/api/enrollments/courses", findAllCoursesWithEnrollmentStatus);
  app.post("/api/enrollments/courses/:courseId", enrollCurrentUserInCourse);
  app.delete(
    "/api/enrollments/courses/:courseId",
    unenrollCurrentUserFromCourse,
  );
}
