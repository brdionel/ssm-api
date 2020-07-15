'use strict';

const db = require('../config/db');

const CourseService = {
    getAll: () => new Promise((resolve, reject) => {
        db.query('SELECT * FROM courses', (err, res) => {
            if(err) reject(err);
            else resolve(res)
        });
    }),

    getById: (id) => new Promise((resolve, reject) => {
        db.query('SELECT * FROM courses WHERE id_course = ?', [id],
            (err, res) => {
                if (err) reject(err);
                else {
                    if (res.length) resolve(res[0]);
                    else resolve(false);
                }
            }
        )
    }),

    create: (course) => new Promise((resolve, reject) => {
        db.query('INSERT INTO courses (name) VALUES (?)', [course.name], 
        (err, res) => {
        if (err) reject(err);
        else resolve(res);
        }
    );
    }),

    update: (course) => new Promise((resolve, reject) => {
        db.query('UPDATE courses SET name = ? WHERE id_course = ?', [course.name, course.id],
        (err, res) => {
            if (err) reject(err);
            else resolve(res);
        }
        );
    }),

    delete: (id) => new Promise((resolve, reject) => {
        db.query('DELETE FROM courses WHERE id_course = ?', [id], 
        (err, res) => {
            if (err) reject(err);
            else resolve(res);
        }
        );
    }),
};

module.exports = CourseService;