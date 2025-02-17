'use strict';

class Schedule {
    id;
    time;
    day;
    course;
    subject;
    teacher;
    students;
    constructor(time, day, course, subject, teacher, id=null){
        this.id = id;
        this.time = time;
        this.day = day;
        this.course = course;
        this.subject = subject;
        this.teacher = teacher;
    }
}

module.exports = Schedule;