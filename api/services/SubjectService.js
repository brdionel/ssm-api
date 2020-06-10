'use strict';
const db = require('../config/db');

const SubjectService = {

  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM subjects', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  }),
  
  getById: (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM subjects WHERE id_subject = ?', [id], 
      (err, res) => {
        if (err) reject(err);
        else {
          if (res.length) resolve(res[0]);
          else resolve(false);
        }
      }
    );
  }),

  create: (subject) => new Promise((resolve, reject) => {
    db.query('INSERT INTO subjects (name) VALUES (?)', [subject.name], 
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  }),

  update: (subject) => new Promise((resolve, reject) => {
    db.query('UPDATE subjects SET name = ? WHERE id_subject = ?', [subject.name, subject.id],
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  }),

  delete: (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM subjects WHERE id_subject = ?', [id], 
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  }),

};

module.exports = SubjectService;