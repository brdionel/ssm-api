'use strict';

const SubjectController = require('../controllers/SubjectController');
const CourseController = require('../controllers/CourseController');

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

};

module.exports = router;
