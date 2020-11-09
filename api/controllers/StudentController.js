'use strict';

const Student = require('../models/Student');
const studentService = require('../services/StudentService');

const StudentController = {

  getAll: (req, res) => {
    studentService.getAll()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).json({ error: true, message: 'Could not obtain student' });
      });
  },

  getById: (req, res) => {
    const id = +req.params.id;

    if (!isNaN(id)) {
        studentService.getById(id)
        .then(result => {
          if (result) res.json(result);
          else res.status(404).json({ error: true, message: 'Student was not found' });
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not obtain student' });
        });
      
    } else {
      res.status(400).json({ error: true, message: 'Invalid student id' });
    }
  },
 
  create: (req, res) => {
    if (req.body.name) {
      const newStudent = new Student(null, req.body.name, req.body.lastName, req.body.file);
      studentService.create(newStudent)
        .then(result => res.json({ success: true, message: 'Estudiante creado' }))
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not create the student' });
        });
    } else {
      res.status(400).json({ error: true, message: 'Student name not given' });
    }
  },
  
  update: (req, res) => {
    const id = +req.params.id;
    if (!isNaN(id) && req.body.name) {
      const newStudent = new Student(id, req.body.name, req.body.lastName, req.body.file);
      studentService.update(newStudent)
        .then(result => {
          if (result.affectedRows)
            res.json({ success: true, message: 'Student successfully updated' });
          else res.status(404).json({ error: true, message: 'Student was not found' });
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not update the student' });
        });
    } else {
      res.status(400).json({ error: true, message: 'Invalid subject id or name given' });
    }
  },

  delete: (req, res) => {
    const id = +req.params.id;
    if (!isNaN(id)) {
        studentService.delete(id)
        .then(result => {
          if (result.affectedRows)
            res.json({ success: true, message: 'Student successfully deleted' });
          else res.status(404).json({ error: true, message: 'Student was not found' });
        })
        .catch(err => {
          res.json({ error: true, message: 'Student was not found' });
        })
    } else {
      res.status(400).json({ error: true, message: 'Invalid student id' });
    }
  }

};

module.exports = StudentController;