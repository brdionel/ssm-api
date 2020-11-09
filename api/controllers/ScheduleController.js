'use strict';

const Schedule = require('../models/Schedule');
const scheduleService = require('../services/ScheduleService');

const scheduleController = {


  getAll: (req, res) => {
    scheduleService.getAll()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).json({ error: true, message: 'Could not obtain schedules' });
      });
  },

  getById: (req, res) => {
    const id = +req.params.id;

    if (!isNaN(id)) {
      scheduleService.getById(id)
        .then(result => {
          if (result) res.json(result);
          else res.status(404).json({ error: true, message: 'Schedule was not found' });
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not obtain schedule' });
        });
      
    } else {
      res.status(400).json({ error: true, message: 'Invalid schedule id' });
    }
  },

  create: (req, res) => {
    if (req.body.time) { 
      const {time, day, course, subject, teacher} = req.body;
      const newSchedule = new Schedule(time, day, course, subject, teacher);
      scheduleService.create(newSchedule)
        .then(result => {
          res.json({ success: true, message: 'Schedule successfully created' });
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not create the schedule' });
        });
    } else {
      res.status(400).json({ error: true, message: 'Schedule day not given' });
    }
  },
  
  update: (req, res) => {

    const id = +req.params.id;
    if (!isNaN(id) && req.body.time) {
      const {time, day, course, subject, teacher} = req.body;
      const newSchedule = new Schedule(time, day, course, subject, teacher, id);
      scheduleService.update(newSchedule)
      .then(result => {
          if (result.affectedRows)
            res.json({ success: true, message: 'Schedule successfully updated' });
          else res.status(404).json({ error: true, message: 'Schedule was not found' });
        })
        .catch(err => {
          res.status(500).json({ error: true, message: 'Could not update the schedule' });
        });
    } else {
      res.status(400).json({ error: true, message: 'Invalid schedule id or time given' });
    }
  },

  delete: (req, res) => {
    const id = +req.params.id;

    if (!isNaN(id)) {
      scheduleService.delete(id)
        .then(result => {
          if (result.affectedRows)
            res.json({ success: true, message: 'Schedule successfully deleted' });
          else res.status(404).json({ error: true, message: 'Schedule was not found' });
        })
        .catch(err => {
          res.json({ error: true, message: 'Schedule was not found' });
        })
    } else {
      res.status(400).json({ error: true, message: 'Invalid schedule id' });
    }
  },

  getWeekDays: (req, res) => {
    scheduleService.getWeekDays()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).json({ error: true, message: 'Could not obtain week days' });
      });
  },
};

module.exports = scheduleController;