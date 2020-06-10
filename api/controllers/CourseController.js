'use strict';

const Course = require('../models/Course');

const courseList = [
  new Course(1, '1-A'),
  new Course(2, '1-B'),
  new Course(3, '2-A'),
  new Course(4, '2-B'),
];

const CourseController = {

  getAll: (req, res) => {
    res.json(courseList);
  },

  getById: (req, res) => {
    const id = +req.params.id;

    if (id) {
      const result = courseList.find(item => item.id === id);
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: true, message: 'Invalid id' });
    }
  }

};

module.exports = CourseController;
