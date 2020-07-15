'use strict';
const db = require('../config/db');

const scheduleService = {

  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM schedules', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  }),
  
  getById: (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM schedules WHERE id_schedule = ?', [id], 
      (err, res) => {
        if (err) reject(err);
        else {
          if (res.length) resolve(res[0]);
          else resolve(false);
        }
      }
    );
  }),

  create: (schedule) => new Promise((resolve, reject) => {
    const {time, day, course, subject, teacher} = schedule;
    db.query('INSERT INTO schedules (time, id_week_day, id_course, id_subject, id_teacher) VALUES (?, ?, ?, ?, ?)', [time, day, course, subject, teacher], 
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  }),

 update: (schedule) => new Promise((resolve, reject) => { 
    const {time, day, course, subject, teacher, id} = schedule;
    db.query('UPDATE schedules SET time = ?, id_week_day = ?, id_course = ?, id_subject = ?, id_teacher = ? WHERE id_schedule = ?', [time, day, course, subject, teacher, id],
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  }),

  delete: (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM schedules WHERE id_schedule = ?', [id], 
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  }),
  
  getWeekDays: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM week_days', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  }),
};

module.exports = scheduleService;