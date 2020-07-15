'use strict';

const SubjectController = require('../controllers/SubjectController');
const CourseController = require('../controllers/CourseController');
const StudentController = require('../controllers/StudentController');

const router = (app) => {

  /* SUBJECTS */
  app.route('/subjects')
    .get(SubjectController.getAll)
    .post(SubjectController.create);

  app.route('/subjects/:id')
    .get(SubjectController.getById)
    .put(SubjectController.update)
    .delete(SubjectController.delete);

  /* COURSES */
  app.route('/courses')
    .get(CourseController.getAll)
    .post(CourseController.create);

  app.route('/courses/:id')
    .get(CourseController.getById)
    .put(CourseController.update)
    .delete(CourseController.delete);

  /* STUDENTS */
  app.route('/students')
  .get(StudentController.getAll)
  .post(StudentController.create);

  app.route('/students/:id')
    .get(StudentController.getById)
    .put(StudentController.update)
    .delete(StudentController.delete);

};

module.exports = router;
