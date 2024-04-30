
import {Users} from './users.mjs';

export class Teachers {

    #username;
    #password;
    #name;
    #courses;

    static #allUsers = [];


    constructor (username, password, name, courses) {
        this.#username = username;
        this.#password = password;
        this.#name = name;
        this.#courses = courses;

    }
    static create (data) {
        //console.log(data);
        
        if ((data !== undefined )&& ( data instanceof Object) && (data.username !== undefined) && (typeof data.username == 'string' ) && (data.password !== undefined) && (typeof data.password == 'string' )
        && (data.name !== undefined) && (typeof data.name == 'string' ) && (data.Courses !== undefined) && (Array.isArray(data.Courses))
        ) {
            
            let ing = new Teachers(data.username, data.password, data.name, data.Courses);
            Teachers.#allUsers.push(ing);
           
            
            return ing;
        }
        return null;
    }

    json() {
        return {
            name: this.#name,
            Courses: this.#courses,
        }
    }


   
    static find(username, password) {
        return Teachers.#allUsers.find((ing) => (ing.getUsername() == username) && ing.verifyPassword(password));
    }
    getUsername() {
        return this.#username;
    }
    verifyPassword(pass) {
        return pass == this.#password;
    }
    setUsername (username) {
        this.#username = username;
    }
    setPassword (password) {
        this.#password = password;
    }
    setCourses (Courses) {
        this.#courses = Courses;
        this.#courses.forEach(e => {
            e.students.forEach(u => {
                Users.findTeach(u.username, u.name, u.grade, u.gradeLetter, e.name, e.creditHours);
            });
            
        });
    }
    setName (name) {
        this.#name = name;
    }
    delete() {
        Teachers.#allUsers= Teachers.#allUsers.filter((ing) => (ing.getUsername() != this.#username) );
    }


}