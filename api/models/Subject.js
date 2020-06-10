'use strict';

class Subject {
    id;
    name;
    constructor(name, id = null){
        this.name = name;
        this.id = id;
    }
}

module.exports = Subject;