/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=fc73bf4fa4bcfb782cce49299a394932'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//input values
const zipCode = document.getElementById('zip');
const feelingsMsg = document.getElementById('feelings');

//gen button
document.getElementById('generate').addEventListener('click', genButton);

function genButton(e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  if(zip && feelings){
    getWeather(baseURL, zip, apiKey)
      .then(function (weatherData) {
        const temperature = weatherData.main.temp;
        postData('/postData', {
          temp: temperature, date: newDate, feeling: feelings
        })
          .then(() => {
            updateUI()
          });
      });
  } else{
    window.alert("please enter Zip code and how you are feeling.")
  }
  
}

//fetch weather data with URL keys
const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  // call API
  try {
    const weatherData = await res.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log('error', error);
  }
}

// POST request
const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    //boilerplate
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    //Body data type must match Content-Type
    body: JSON.stringify(data),
  });
  try {
    const newWeatherData = await res.json();
    console.log(newWeatherData);
    return newWeatherData;
  } catch (error) {
    console.log('error', error);
  };
}
//GET request
const getData = async (url = '') => {
  const request = await fetch(url);
  try {
    const getData = await request.json()
  }
  catch (error) {
    console.log('error', error);
  }
};
//update UI
const updateUI = async () => {
  const request = await fetch('/getData');
  try {
    const allData = await request.json();
    console.log(allData)
    document.getElementById('city').innerHTML = allData["name"]
    document.getElementById('date').innerHTML = allData["date"];
    document.getElementById('temp').innerHTML = allData["temp"];
    document.getElementById('content').innerHTML = allData["feeling"];
  } catch (error) {
    console.log('error', error);
  }
};
