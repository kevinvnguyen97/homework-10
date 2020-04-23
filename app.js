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
var usedIds = [];
var usedEmails = [];
var usedGithubs = [];
var managerExists = false;

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

console.log("Kevin's Team Builder App");
console.log();
console.log("Build an engineering team consisting of one manager and multiple engineers and interns!");
console.log();
mainPrompt();

function mainPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose employee type:",
            name: "employeeChoice",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Finished building team"
            ]
        }
    ]).then(function (response) {
        switch(response.employeeChoice) {
            case "Manager":
                if (managerExists) {
                    console.log("Manager already exists! Choose engineer or intern.");
                    console.log();
                    mainPrompt();
                }
                else {
                    console.log();
                    managerExists = true;
                    managerPrompt();
                }
                break;

            case "Engineer":
                console.log();
                engineerPrompt();
                break;

            case "Intern":
                console.log();
                internPrompt();
                break;

            default:
                console.log();
                renderPage();
        }
    });
}

function managerPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter manager name:",
            name: "managerName"
        },

        {
            type: "number",
            message: "Enter manager's ID:",
            name: "managerId"
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
        }
    ]).then(function (response) {
        if (!checkId(response.managerId) || !checkEmail(response.managerEmail) || !checkRoomNumber(response.managerRoomNumber)) {
            console.log();
            managerPrompt();
        }

        else {
            const teamManager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerRoomNumber);
            
            pushUniqueInfo(teamManager, response.managerId, response.managerEmail);
            
            console.log();
            mainPrompt();
        }
    });
}

function engineerPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter an engineer's name:",
            name: "engineerName",
        },

        {
            type: "number",
            message: "Enter engineer's ID:",
            name: "engineerId"
        },

        {
            type: "input",
            message: "Enter engineer's email:",
            name: "engineerEmail"
        },

        {
            type: "input",
            message: "Enter engineer's github username:",
            name: "engineerGithub"
        }
    ]).then(function (response) {
        if (!checkId(response.engineerId) || !checkEmail(response.engineerEmail) || !checkGithub(response.engineerGithub)) {
            console.log();
            engineerPrompt();
        }

        else {
            var teamEngineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
            
            usedGithubs.push(response.engineerGithub);
            pushUniqueInfo(teamEngineer, response.engineerId, response.engineerEmail);
            
            console.log();
            mainPrompt();
        }
    });
}

function internPrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter intern's name:",
            name: "internName"
        },

        {
            type: "number",
            message: "Enter intern's ID:",
            name: "internId"
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
    ]).then(function(response) {
        if (!checkId(response.internId) || !checkEmail(response.internEmail)) {
            console.log();
            internPrompt();
        }

        else {
            var teamIntern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
            
            pushUniqueInfo(teamIntern, response.internId, response.internEmail);
            
            console.log();
            mainPrompt();
        }
    });
}

function checkId(inputId) {
    console.log();

    if (usedIds.includes(inputId)) {
        console.log("ID is already used! Try again and enter a unique ID.");
        console.log("IDs used: " + usedIds);
        return false;
    }
    else if (inputId === undefined || inputId <= 0) {
        console.log("ID is not a valid number! Try again and enter a positive integer for the ID.");
    }
    else {
        return true;
    }
}

function checkEmail(inputEmail) {
    if (usedEmails.includes(inputEmail)) {
        console.log();
        console.log("Email already exists in this team! Try again and enter a unique email.");
        console.log("Emails used: " + usedEmails);
        return false;
    }
    else {
        return true;
    }
}

function checkRoomNumber(inputRoomNumber) {
    if (inputRoomNumber === undefined || inputRoomNumber <= 0) {
        console.log("Room number is not a valid number! Try again and enter a positive integer for the room number.");
        return false;
    }
    else {
        return true;
    }
}

function checkGithub(inputGithub) {
    if(usedGithubs.includes(inputGithub)) {
        console.log();
        console.log("Github username already exists in this team! Try again and enter a unique Github username.");
        console.log("Github usernames used: " + usedGithubs);
        return false;
    }
    else {
        return true;
    }
}

function pushUniqueInfo(employee, inputId, inputEmail) {
    employees.push(employee);
    usedIds.push(inputId);
    usedEmails.push(inputEmail);
}

function renderPage() {
    console.log();
    console.log("Full team: " + employees);
    console.log();
    fs.writeFileSync(outputPath, render(employees), function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Team page generated in './output/index.html' !");
        }
    });
}