'use strict';
const db = require('../config/db');
const CourseService = require('./CourseService');
const SubjectService = require('./SubjectService');
const TeacherService = require('./TeacherService');

const ScheduleService = {

  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM schedules', (err, res) => {
      if (err) reject(err);
      else {
        res = res.map(item => ScheduleService.getFullItem(item));
        Promise.all(res).then(values => resolve(values));
      }
    });
  }),
  
  getById: (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM schedules WHERE id_schedule = ?', [id], 
      (err, res) => {
        if (err) reject(err);
        else {
          if (res.length) {
            res.forEach(item => {
              ScheduleService.getFullItem(item).then(item => resolve(item));
            });
          }
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
  
  getWeekDayById: (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM week_days WHERE id_week_day = ?', [id], (err, res) => {
      if (err) reject(err);
      else if (res.length) resolve(res[0]);
      else resolve(false);
    });
  }),

  getFullItem: (item) => Promise.all([
      TeacherService.getById(item.id_teacher),
      CourseService.getById(item.id_course),
      SubjectService.getById(item.id_subject),
      ScheduleService.getWeekDayById(item.id_week_day),
    ]).then(([ teacher, course, subject, week_day]) => {
      item.teacher = teacher;
      item.course = course;
      item.subject = subject;
      item.week_day = week_day;
      return {...item};
    }),
};

module.exports = ScheduleService;