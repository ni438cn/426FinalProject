

export class Users {

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
            
            let ing = new Users(data.username, data.password, data.name, data.Courses);
            Users.#allUsers.push(ing);
           
            
            return ing;
        }
        return null;
    }

    json() {
        return {
            name: this.#name,
            Courses: this.#courses,
            GPA: this.getGPA()
        }
    }
    static letterNumber(a) {
        switch (a) {
            case "A":
                return 4;
            case "A-":
                return 3.7;
            case "B+":
                return 3.3;
            case "B":
                return 3;
            case "B-":
                return 2.7;
            case "C+":
                return 2.3;
            case "C":
                return 2;
            case "C-":
                return 1.7;
            case "D+":
                return 1.3;
            case "D":
                return 1;
            case "F":
                return 0;
                
        }
    }

    getGPA() {
        let points = 0;
        let ch = 0;
        this.#courses.forEach(element => {
            ch += element.creditHours;
            points +=  element.creditHours * Users.letterNumber(element.gradeLetter);

        });
        return points / ch;
    }
    static find(username, password) {
        return Users.#allUsers.find((ing) => (ing.getUsername() == username) && ing.verifyPassword(password));
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
    }
    setName (name) {
        this.#name = name;
    }
    delete() {
        Users.#allUsers= Users.#allUsers.filter((ing) => (ing.getUsername() != this.#username) );
    }


}