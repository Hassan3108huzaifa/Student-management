#! /usr/bin/env node
import inquirer from "inquirer";
let myBalance = 20000;
let courseFee = 6500;
let ID = Math.floor(Math.random() * 9000 + 6000);
let allStudents = [];
await main();
async function main() {
    let option = await inquirer.prompt([
        {
            name: "selectOption",
            type: "list",
            message: "Choose the given options: ",
            choices: ["Register new student", "See students list", "View Balance", "Exit"]
        }
    ]);
    switch (option.selectOption) {
        case "Register new student":
            await Register();
            break;
        case "View Balance":
            console.log(`Your Balance is ${myBalance}`);
            await main();
            break;
        case "See students list":
            await allStudentsList();
            break;
        case "Exit":
            await ExitLoop();
            break;
    }
}
async function Register() {
    let answer = await inquirer.prompt([
        {
            name: "addStudent",
            type: "input",
            message: "Enter new Student name"
        },
    ]);
    console.log(`Student "${answer.addStudent}" added with ID "${ID}"`);
    let addCourse = await inquirer.prompt([
        {
            name: "course",
            type: "list",
            message: "Choose course",
            choices: ["Python Programming", "Web Development", "Data Science", "Cybersecurity", "Mobile App Development", "Cloud Computing", "Artificial Intelligence"]
        }
    ]);
    let additionalCourseFee = 0;
    let confirmCourse = await inquirer.prompt([
        {
            name: "extraCourse",
            type: "confirm",
            message: "Do you want to add any other course?"
        }
    ]);
    if (confirmCourse.extraCourse) {
        additionalCourseFee = await extraCourse();
    }
    await feeArea(answer.addStudent, addCourse, additionalCourseFee);
}
async function feeArea(studentName, Course, additionalCourseFee) {
    while (true) {
        let endOption = await inquirer.prompt([
            {
                name: "endOptions",
                type: "list",
                message: "Choose what you want",
                choices: ["View Balance", "Pay Fee"]
            }
        ]);
        if (endOption.endOptions === "View Balance") {
            console.log(`Your Balance is: ${myBalance}`);
        }
        else if (endOption.endOptions === "Pay Fee") {
            console.log(`Course fee: ${courseFee}, Additional course fee: ${additionalCourseFee}`);
            let TotalFee = courseFee + additionalCourseFee;
            console.log(`Total fee to pay: ${TotalFee}`);
            if (TotalFee >= myBalance) {
                console.log(`insuficiant Balance`);
                break;
            }
            myBalance -= TotalFee;
            console.log(`Your remaining balance is: ${myBalance}`);
            let studentStatus = {
                name: studentName,
                id: ID,
                course: Course,
                totalFeePaid: TotalFee,
            };
            console.log(`Student "${studentName}" registered successfully.`);
            console.log(`===Your Status===`);
            console.log(studentStatus);
            allStudents.push(studentStatus);
            main();
            break;
        }
    }
}
async function allStudentsList() {
    console.log(allStudents);
    await main();
}
async function extraCourse() {
    let addExtraCourse = await inquirer.prompt([
        {
            name: "addExtra",
            type: "input",
            message: "Enter course you like: "
        }
    ]);
    console.log(`You added Additional Course "${addExtraCourse.addExtra}"`);
    return 2000;
}
async function ExitLoop() {
    let exit = await inquirer.prompt([
        {
            name: "Exit",
            type: "confirm",
            message: "do you want to exit?"
        }
    ]);
    if (exit.Exit) {
        console.log();
    }
    else {
        main();
    }
}
