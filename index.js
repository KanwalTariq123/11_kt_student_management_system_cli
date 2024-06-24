#! /usr/bin/env node
import inquirer from "inquirer";
console.log("\nWelcome to Student Management System!\n");
class Student {
    name;
    static idCounter = 0;
    studentID;
    courses = [];
    balance = 0;
    constructor(name) {
        this.name = name;
        Student.idCounter++;
        this.studentID = this.generateStudentID();
    }
    generateStudentID() {
        return 10000 + Student.idCounter;
    }
    enrollCourse(course) {
        this.courses.push(course);
        this.balance += 1000;
    }
    viewBalance() {
        return this.balance;
    }
    payCoursesFee(amount) {
        this.balance -= amount;
    }
    showStatus() {
        console.log(`
    Name : ${this.name}
    Student ID : ${this.studentID}
    Courses Enrolled : ${this.courses.join(", ")}
    Balance : ${this.balance}
    `);
    }
    getStudentID() {
        return this.studentID;
    }
    getName() {
        return this.name;
    }
}
const students = [];
async function mainMenu() {
    const userInputMenu = await inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: "Select your Menu!",
        choices: [
            "1. Add New Student",
            "2. Enroll Student in Course",
            "3. View Student Balance",
            "4. Pay course fees",
            "5. Show student Status",
            "6. End Menu"
        ]
    });
    // destructuring
    const { menu } = userInputMenu;
    if (menu === "1. Add New Student")
        await addNewStudent();
    if (menu === "2. Enroll Student in Course")
        await enrollStudent();
    if (menu === "3. View Student Balance")
        await viewBalance();
    if (menu === "4. Pay course fees")
        await payTution();
    if (menu === "5. Show student Status")
        await showStatus();
    if (menu === "6. End Menu") {
        console.log(`\nThank you for using Student Management System\n`);
        process.exit();
    }
    mainMenu();
}
async function addNewStudent() {
    const userInput = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: "Enter Student Name here!"
    });
    const student = new Student(userInput.name);
    students.push(student);
    console.log(`\nStudent ${student.getName()} added with ID ${student.getStudentID()}\n`);
}
async function enrollStudent() {
    const student = await selectStudent();
    if (student) {
        const userInput = await inquirer.prompt({
            type: 'list',
            name: 'course',
            message: "select courses to enroll",
            choices: ["TypeScript", "JavaScript", "Python", "Next.js"]
        });
        student.enrollCourse(userInput.course);
        console.log(`\nSuccessfully Enrolled in Course: ${userInput.course}\n`);
    }
}
async function viewBalance() {
    const student = await selectStudent();
    if (student) {
        console.log(`\nBalance : ${student.viewBalance()}\n`);
    }
}
async function payTution() {
    const student = await selectStudent();
    if (student) {
        const userInput = await inquirer.prompt({
            type: 'input',
            name: 'amount',
            message: "Enter amount you want to pay?"
        });
        student.payCoursesFee(parseFloat(userInput.amount));
        console.log(`\nPaid ${userInput.amount}. Balance remaining ${student.viewBalance()}\n`);
    }
}
async function showStatus() {
    const student = await selectStudent();
    if (student) {
        student.showStatus();
    }
}
async function selectStudent() {
    if (students.length === 0) {
        console.log(`\nNo Students record available.\n`);
    }
    else {
        const stdSelect = await inquirer.prompt({
            type: 'list',
            name: 'stdID',
            message: "Select a student!",
            choices: students.map((std) => ({
                name: std.getName(),
                value: std.getStudentID()
            }))
        });
        return (students.find((std) => std.getStudentID() === stdSelect.stdID) || null);
    }
}
mainMenu();
