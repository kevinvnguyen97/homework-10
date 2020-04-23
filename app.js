const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
inquirer.prompt([
    // Manager stuff
    {
        type: "input",
        message: "Enter manager name:",
        name: "managerName"
    },

    {
        type: "number",
        message: "Enter manager's ID:",
        name: "managerID"
    },

    {
        type: "input",
        message: "Enter manager's email:",
        name: "managerEmail"
    },

    {
        type: "number",
        message: "Enter manager's room number:",
        name: "managerRoomNumber"
    },

    // Engineer stuff
    {
        type: "input",
        message: "Enter an engineer's name:",
        name: "engineerName",
    },

    {
        type: "number",
        message: "Enter engineer's ID:",
        name: "engineerID"
    },

    {
        type: "input",
        message: "Enter engineer's github username:",
        name: "engineerUserName"
    },

    {
        type: "input",
        message: "Enter engineer's email:",
        name: "engineerEmail"
    },

    // Intern stuff
    {
        type: "input",
        message: "Enter intern's name:",
        name: "internName"
    },

    {
        type: "number",
        message: "Enter intern's ID:",
        name: "internID"
    },

    {
        type: "input",
        message: "Enter intern's email:",
        name: "internEmail"
    },

    {
        type: "input",
        message: "Enter intern's school:",
        name: "internSchool"
    }

]).then(response => {
    const teamManager = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerRoomNumber);
    employees.push(teamManager);
    const teamEngineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerUserName);
    employees.push(teamEngineer);
    const teamIntern = new Intern(response.internName, response.internID, response.internEmail, response.internSchool);
    employees.push(teamIntern);

    console.log(employees);

    render(employees);
});

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
