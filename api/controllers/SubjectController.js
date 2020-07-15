'use strict';

const Subject = require('../models/Subject');
const SubjectService = require('../services/SubjectService');

const SubjectController = {

  getAll: (req, res) => {
    SubjectService.getAll()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).json({ error: true, message: 'Could not obtain subjects' });
      });
  },

  getById: (req, res) => {
    const id = +req.params.id;

    if (!isNaN(id)) {
      SubjectService.getById(id)
        .then(result => {
          if (result) res.json(result);
          else res.status(404).json({ error: true, message: 'Subject was not found' });
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not obtain subject' });
        });
      
    } else {
      res.status(400).json({ error: true, message: 'Invalid subject id' });
    }
  },

  create: (req, res) => {
    if (req.body.name) {
      const newSubject = new Subject(req.body.name);
      SubjectService.create(newSubject)
        .then(result => {
          res.json({ success: true, message: 'Subject successfully created' });
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not create the subject' });
        });
    } else {
      res.status(400).json({ error: true, message: 'Subject name not given' });
    }
  },
  
  update: (req, res) => {
    const id = +req.params.id;
    if (!isNaN(id) && req.body.name) {
      const newSubject = new Subject(req.body.name, id);
      SubjectService.update(newSubject)
        .then(result => {
          if (result.affectedRows)
            res.json({ success: true, message: 'Subject successfully updated' });
          else res.status(404).json({ error: true, message: 'Subject was not found' });
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not update the subject' });
        });
    } else {
      res.status(400).json({ error: true, message: 'Invalid subject id or name given' });
    }
  },

  delete: (req, res) => {
    const id = +req.params.id;

    if (!isNaN(id)) {
      SubjectService.delete(id)
        .then(result => {
          if (result.affectedRows)
            res.json({ success: true, message: 'Subject successfully deleted' });
          else res.status(404).json({ error: true, message: 'Subject was not found' });
        })
        .catch(err => {
          res.json({ error: true, message: 'Subject was not found' });
        })
    } else {
      res.status(400).json({ error: true, message: 'Invalid subject id' });
    }
  }

};

module.exports = SubjectController;