/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=fc73bf4fa4bcfb782cce49299a394932&units=metric'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

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
        const name = weatherData.name;
        postData('/postData', {
          name: name, temp: temperature, date: newDate, feeling: feelings
        })
          .then(() => {
            console.log(temperature, newDate, feelings)
            updateUI()
          });
      });
  } else{
    window.alert("please enter Zip code and how you are feeling.")
  }
  
}

//fetch weather data with URL keys
const getWeather = async (baseURL, zip, apiKey) => {
  const response = await fetch(baseURL + zip + apiKey);
  // call API
  try {
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log('error', error);
  }
}

// POST request
const postData = async (url, data) => {
  const response = await fetch(url, {
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
    const newWeatherData = await response.json();
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
    const getData = await request.json();
    return getData;
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
    document.getElementById('date').innerHTML = `Date: ${allData["date"]}`;
    document.getElementById('temp').innerHTML = `Temperature: ${allData["temp"]}??C`;
    document.getElementById('content').innerHTML = `Feeling ${allData["feeling"]}`;
  } catch (error) {
    console.log('error', error);
  }
};

