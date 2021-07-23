// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const port = 3000;

const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server  = app.listen(port, listening);
function listening(){
  console.log(`running on localhost: ${port}`)
}
// GET route
app.get('/', sendData);

function sendData(req, res) {
  res.send(projectData);
  console.log(projectData)
};

// POST route
app.post('/add', postData);

function postData(req, res) {
  const newWeatherJournal = {
    temperature: request.body.temperature,
    date: request.body.date,
    userResponse: request.body.userResponse
  };
  projectData.push(newWeatherJournal);
  res.send(projectData);
}

