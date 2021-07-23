/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?'
let apiKey = '&appid=fc73bf4fa4bcfb782cce49299a394932'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// POST and GET requests
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}


const getWeatherInfo = async (baseURL, entry, apiKey) => {
  const res = await fetch(baseURL + entry + apiKey)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }
  catch (error) {
    console.log('error', error);
  }
}

const zipCode = 'zip=10987'

// Generate button and chain promises

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {

  const newContent = document.getElementById('content').value;

  getWeatherInfo(baseURL, zipCode, apiKey)
    .then(function(data){
      console.log(data);
      postData('/add', {date: data.date,temperature:data.temperature, content:newContent})
    })
    .then(
      updateUI()
    )

}

const updateUI = async () => {
  const request = await fetch('/');
  try{
    const allData = await request.json;
    document.getElementById('date').innerHTML = allData[0].date;
    document.getElementById('temp').innerHTML = allData[0].temperature;
    document.getElementById('content').innerHTML = allData[0].newContent;

  }catch(error){
    console.log('error', error);
  }
}

// const newDate = document.getElementById('date').value;
// const newTemp = document.getElementById('temp').value;


// function postGet(){
//   postData('/weather', {temperature:'20', date:'01/01/2021', response:'mild day'})
//     .then(function(data){
//       getWeather('/all')
//     })
// }
// postGet()