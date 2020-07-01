'use strict';

const User = require('./User');

class Teacher extends User {
    registration;
    constructor(id, name, lastName, registration){
        super(id, name, lastName);
        this.registration = registration;
    }
}

module.exports = User;
