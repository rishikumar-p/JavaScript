// Assignment 1

// Q1. Write a program to demonstrate how a function can be passed as a parameter to another function.

var totalParticipants = 0;
var participants = [];

function updateTotalParticipants() {
    totalParticipants++;
    console.log("totalParticipants: " + totalParticipants);
    console.log("participants: " + participants)
}

function addParticipant(name, func1) {
    participants[totalParticipants] = name;
    func1();
}

addParticipant("A", updateTotalParticipants);
addParticipant("B", updateTotalParticipants);
addParticipant("C", updateTotalParticipants);



/*
 *  Q2: An arrow function takes two arguments firstName and lastName and returns a 2 letter string that represents the first letter of both the arguments. For the arguments Roger and Waters, the function returns ‘RW’. Write this function.
 *      Submit the github link to the code
 */

var printFirstLetters = (firstName, lastName) => firstName[0]+lastName[0];

var firstName = "Rishi";
var lastName = "Pebbeti";
console.log(printFirstLetters(firstName, lastName)); 


let string = "Javascript";
for (let char of string) {
 console.log(char);
}
for (let char in string) {
    console.log(char);
}