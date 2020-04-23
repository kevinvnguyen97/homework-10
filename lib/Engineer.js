const Employee = require("./Employee.js");

class Engineer extends Employee {
    constructor(name, id, email, githubUserName) {
        super(name, id, email);
        this.githubUserName = githubUserName;
    }

    getGithub() {
        return this.githubUserName;
    }

    getRole() {
        return this.constructor.name;
    }
}

module.exports = Engineer;