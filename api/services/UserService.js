'use strict';
const db = require('../config/db');

const UserService = {

  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  }),
  
  getById: (id) => new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id_user = ?', [id], 
      (err, res) => {
        if (err) reject(err);
        else {
          if (res.length) resolve(res[0]);
          else resolve(false);
        }
      }
    );
  }),

  create: (user) => new Promise((resolve, reject) => {
    db.query('INSERT INTO users (name, lastname) VALUES (?, ?)', [user.name, user.lastname], 
      (err, res) => {
        if (err) reject(err);
        else {
          db.query('SELECT LAST_INSERT_ID()', 
            (err2, res2) => {
              if (err2) reject(err2);
              else resolve(res2);
            }
          );
        };
      }
    );
  }),

  update: (user) => new Promise((resolve, reject) => {
    db.query('UPDATE users SET name = ?, lastname = ? WHERE id_user = ?', [user.name, user.lastname, user.id],
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  }),

  delete: (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM users WHERE id_user = ?', [id], 
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  }),

};

module.exports = UserService;