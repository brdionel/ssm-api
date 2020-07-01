'use strict';

const User = require('./User');

class Student extends User {
    file;
    constructor(id, name, lastName, file){
        super(id, name, lastName);
        this.file = file;
    }
}

module.exports = Student;