// Require Express to run server and routes
// Start up an instance of app
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const cors = require('cors')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
// Cors for cross origin allowance
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server  = app.listen(port, listening);
function listening(){
  console.log(`running on localhost: ${port}`)
}
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// GET route
app.get('/getData', (req, res) => {
  res.send(projectData);
  console.log(projectData)
});

// POST route
app.post('/postData', (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

