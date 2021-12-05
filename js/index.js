// Declare global variables
let page = 1;

// Build DOM interface variables
const createMonster = document.getElementById('create-monster');
const form = document.querySelector('form');
const monsterContainer = document.getElementById('monster-container');
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');

// Set event listeners
form.addEventListener('submit', e => addMonster(e));
backButton.addEventListener('click', e => pageBack(e));
forwardButton.addEventListener('click', e => pageForward(e));

// Print the first set of monsters automatically
printMonsters();

// Function to advance a page
function pageForward() {
  page ++;
  printMonsters();
}

// Function to go back a page
function pageBack() {
  page > 1 ? page -- : console.log('You are already on page 1');
  printMonsters();
}

// Function to fetch and then print monster list
function printMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`, {
    })
    .then(resp => resp.json())
    .then(json => publish(json));
}

// Function to cycle through all monsters returned by search
function publish(monsters) {
  monsterContainer.replaceChildren();
  for (monster of monsters) {
    appendMonster(monster);
  }
}

// Function to add a new monster to the DOM
function appendMonster(object) {
  let newDiv = document.createElement('div');
  let newH2 = document.createElement('h2');
  newH2.textContent = object.name;
  let newH4 = document.createElement('h4');
  newH4.textContent = 'Age: ' + object.age;
  let newP = document.createElement('p');
  newP.textContent = 'Bio: ' + object.description;
  newDiv.appendChild(newH2);
  newDiv.appendChild(newH4);
  newDiv.appendChild(newP);
  monsterContainer.appendChild(newDiv);
}

// Function to submit user-provided monster to database
function addMonster(e) {
  e.preventDefault();
  const submitName = e.target.name.value;
  const submitAge = e.target.age.value;
  const submitDescription = e.target.description.value;
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: submitName,
      age: submitAge,
      description: submitDescription,
    }),
  })
  form.reset();
}