const weather = document.querySelector(".js-weather");

const API_KEY = "a2b459a9ab997488391f9b20e51c479f";
const COORDS = 'coords';

function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(json){
        let temperature = (json.main.temp).toFixed(1);
        let howWeather = json.weather[0].main;

        if(temperature > 24){
            temperature = `🔥 ${temperature}`;
        } else if (temperature < 17) {
            temperature = `🥶 ${temperature}`;
        }
        if(howWeather === 'Clouds'){
            howWeather = '☁️';
        }

        weather.innerText = `${temperature}℃ / ${howWeather}`;
    });
}

function saveCoords(coordsObj){
     localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//위도와 경도 읽어오기
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handGeoError() {
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();