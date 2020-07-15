'use strict';
const db = require('../config/db');
const userService = require('../services/UserService');
const User = require('../models/User');

const StudentService = {

  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM students_list', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  }),
  
  getById: (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM students_list WHERE id_student = ?', [id], 
      (err, res) => {
        if (err) reject(err);
        else {
          if (res.length) resolve(res[0]);
          else resolve(false);
        }
      }
    );
  }),

  create: (student) => new Promise((resolve, reject) => {
    userService.create(student).then((idUser)=>{
      db.query('INSERT INTO students (file, id_user) VALUES (?, ?)',[student.file, idUser], 
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }),

  update: (student) => new Promise((resolve, reject) => {
    StudentService.getById(student.id).then((dbStudent)=>{
      student.id_user = dbStudent.id_user;
      const user = new User(student.id_user, student.name, student.lastName);
      userService.update(user).then(()=>{
        db.query('UPDATE students SET file = ? WHERE id_student = ?', [student.file, student.id],
          (err, res) => {
            if (err) reject(err);
            else resolve(res);
          }
        );   
      });
    });
  }),

  delete: (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM students WHERE id_student = ?', [id], 
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  }),

};

module.exports = StudentService;