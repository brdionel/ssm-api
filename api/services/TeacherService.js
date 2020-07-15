'use strict';
const User = require('../models/User');
const db = require('../config/db');
const UserService = require('../services/UserService');
const Teacher = require('../models/Teacher');


const TeacherService = {

    getAll: () => new Promise((resolve, reject) => {
      db.query('SELECT * FROM teachers_list', (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    }),
    
    getById: (id) => new Promise((resolve, reject) => {
      db.query('SELECT * FROM teachers_list WHERE id_teacher = ?', [id], 
        (err, res) => {
          if (err) reject(err);
          else {
            if (res.length) resolve(res[0]);
            else resolve(false);
          }
        }
      );
    }),
  
    create: (teacher) => new Promise((resolve, reject) => {
      
      UserService.create(teacher).then((id_usuario) => {
        db.query('INSERT INTO teachers (registration, id_user) VALUES (?,?) ', [teacher.registration, id_usuario], 
          (err, res) => {
            if (err) reject(err);
            else resolve(res);
          }
        );
      })
    }),
  
    update: (teacher) => new Promise((resolve, reject) => {
      TeacherService.getById(teacher.id).then((dbteacher) =>{
        teacher.id_user = dbteacher.id_user;
        const user = new User (teacher.id_user, teacher.name, teacher.lastName);
        UserService.update(user).then(() => {
          db.query('UPDATE teachers SET registration = ? WHERE id_teacher = ?', [teacher.registration, teacher.id],
            (err, res) => {
              if (err) reject(err);
              else resolve(res);
            }
          );
        })
      })}
    ),
  
    delete: (id) => new Promise((resolve, reject) => {
      db.query('DELETE FROM teachers WHERE id_teacher = ?', [id], 
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    }),
  
  };


module.exports = TeacherService;