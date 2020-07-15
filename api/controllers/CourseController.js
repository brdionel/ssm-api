'use strict';

const Course = require('../models/Course');
const CourseService = require('../services/CourseService');

const CourseController = {

  getAll: (req, res) => {
    CourseService.getAll()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({
        error:true,
        message: 'Could not obtain Courses'
      });
    })
  },

  getById: (req, res) => {
    const id = +req.params.id;

    if (!isNaN(id)) {
      CourseService.getById(id)
        .then(result => {
          if(result) res.json(result);
          else res.status(404).json({
            error: true,
            message: 'Course was not found'
          });
        })
        .catch(err => {
          res.status(500).json({
            error: true,
            message: 'Could not obtain course'
          });
        })
    } else {
      res.status(400).json({
        error: true,
        message: 'Invalid Course id'
      });
    }
  },

  create: (req, res) => {
    if (req.body.name) {
      const newCourse = new Course(null, req.body.name);
      CourseService.create(newCourse)
        .then(result => {
          res.json({ success: true, message: 'Course successfully created' });
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not create the course' });
        });
    } else {
      res.status(400).json({ error: true, message: 'Course name not given' });
    }
  },

  update: (req, res) => {
    
    const id = +req.params.id;
    if (!isNaN(id) && req.body.name) {
      const newCourse = new Course(id, req.body.name);
      CourseService.update(newCourse)
        .then(result => {
          if (result.affectedRows)
            res.json({ success: true, message: 'Course successfully updated' });
          else res.status(404).json({ error: true, message: 'Course was not found' });
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not update the Course' });
        });
    } else {
      res.status(400).json({ error: true, message: 'Invalid Course id or name given' });
    }
  },

  delete: (req, res) => {
    const id = +req.params.id;

    if (!isNaN(id)) {
      CourseService.delete(id)
        .then(result => {
          if (result.affectedRows)
            res.json({ success: true, message: 'Course successfully deleted' });
          else res.status(404).json({ error: true, message: 'Course was not found' });
        })
        .catch(err => {
          res.json({ error: true, message: 'Course was not found' });
        })
    } else {
      res.status(400).json({ error: true, message: 'Invalid Course id' });
    }
  }

};

module.exports = CourseController;