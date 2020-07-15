'use strict';

const Teacher = require('../models/Teacher');
const TeacherService = require('../services/TeacherService');


const TeacherController = {

    getAll: (req, res) => {
      TeacherService.getAll()
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not obtain teacher' });
        });
    },
  
    getById: (req, res) => {
      const id = +req.params.id;  
      if (!isNaN(id)) {
        TeacherService.getById(id)
          .then(result => {
            if (result) res.json(result);
            else res.status(404).json({ error: true, message: 'Teacher was not found' });
          })
          .catch(err => {
            res.status(500).json({ error: true, message: 'Could not obtain teacher' });
          });
        
      } else {
        res.status(400).json({ error: true, message: 'Invalid teacher id' });
      }
    },
  
    create: (req, res) => {

      if (req.body.name) {  
        const newTeacher = new Teacher(null , req.body.name, req.body.lastName, req.body.registration);
        TeacherService.create(newTeacher)
          .then(result => {
            res.json({ success: true, message: 'Teacher successfully created' });
          })
          .catch(err => {
            res.status(500).json({ error: true, message: 'Could not create the teacher' });
          });
      } else {
        res.status(400).json({ error: true, message: 'Teacher name not given' });
      }
    },
    
    update: (req, res) => {
      const id = +req.params.id;
      if (!isNaN(id) && req.body.name) {
        const newTeacher = new Teacher(id, req.body.name, req.body.lastName, req.body.registration);
        TeacherService.update(newTeacher)
          .then(result => {
            if (result.affectedRows)
              res.json({ success: true, message: 'Teacher successfully updated' });
            else res.status(404).json({ error: true, message: 'Teacher was not found' });
          })
          .catch(err => {
            res.status(500).json({ error: true, message: 'Could not update the teacher' });
          });
      } else {
        res.status(400).json({ error: true, message: 'Invalid teacher id or name given' });
      }
    },
  
    delete: (req, res) => {
      const id = +req.params.id;
  
      if (!isNaN(id)) {
        TeacherService.delete(id)
          .then(result => {
            if (result.affectedRows)
              res.json({ success: true, message: 'Teacher successfully deleted' });
            else res.status(404).json({ error: true, message: 'Teacher was not found' });
          })
          .catch(err => {
            res.json({ error: true, message: 'Teacher was not found' });
          })
      } else {
        res.status(400).json({ error: true, message: 'Invalid Teacher id' });
      }
    }
  
  };




module.exports = TeacherController;
