const API_KEY = 'kHyuhbpKq6YwEmlF1G4GDC9OIwKcvmyH';
const locationCode = { Lviv: 324561, Kyiv: 324505, Kharkiv: 323903, Chernihiv: 322162, Odesa: 325343,
    Mariupol: 323037, Poltava: 325523, Zhytomyr: 326609, Cherkasy: 321985, London: 328328, Warsaw: 274663, NewYork: 349727 };
let locationKey;

const optionLocation = document.querySelector('.weather__location');
const buttonGetWeather = document.querySelector('.weather__btn');

function getLocationKey() {
    switch (optionLocation.value) {
        case "Lviv":
            locationKey = locationCode["Lviv"];
            break;
        case "Kyiv" :
            locationKey = locationCode["Kyiv"];
            break;
        case "Kharkiv":
            locationKey = locationCode["Kharkiv"];
            break;
        case "Chernihiv":
            locationKey = locationCode["Chernihiv"];
            break;
        case "Odesa":
            locationKey = locationCode["Odesa"];
            break;
        case "Mariupol":
            locationKey = locationCode["Mariupol"];
            break;
        case "Poltava":
            locationKey = locationCode["Poltava"];
            break;
        case "Zhytomyr":
            locationKey = locationCode["Zhytomyr"];
            break;
        case "Cherkasy":
            locationKey = locationCode["Cherkasy"];
            break;
        case "London":
            locationKey = locationCode["London"];
            break;
        case "Warsaw":
            locationKey = locationCode["Warsaw"];
            break;
        case "New York":
            locationKey = locationCode["NewYork"];
            break;
    }
    return locationKey;
}

function temperatureConversion(temperature) {
    return Math.floor((temperature -  32) / 1.8);
}

function showWeather(data) {
    document.querySelector('.weather__information').innerHTML = '';

    for(const weather of data["DailyForecasts"]) {

        //Додаємо дату
        const dateElement = document.createElement('p');
        dateElement.className = 'weather__date';

        //Обираємо день
        let day = new Date(weather.Date).getDay();
        switch (day){
            case 0:
                day = 'Sunday';
                break;
            case 1:
                day = 'Monday';
                break;
            case 2:
                day = 'Tuesday';
                break;
            case 3:
                day = 'Wednesday';
                break;
            case 4:
                day = 'Thursday';
                break;
            case 5:
                day = 'Friday';
                break;
            case 6:
                day = 'Saturday';
                break
        }

        dateElement.innerHTML = `${weather.Date.slice(0, 10).split('-').reverse().join('/')}<br>${day}`;

        const img = document.createElement('img');
        img.className = 'weather__img';
        img.alt = 'Picture of weather';
        if(weather.Day.IconPhrase === 'Dreary' || weather.Day.IconPhrase === 'Mostly cloudy' || weather.Day.IconPhrase === 'Cloudy'
            || weather.Day.IconPhrase === 'Partly sunny') {
            img.src = '../assets/img/cloudy.png';
        } else if(weather.Day.IconPhrase === 'Rain' || weather.Night.IconPhrase === 'Rain') {
            img.src = '../assets/img/rain.png';
        } else if(weather.Day.IconPhrase === 'Showers' || weather.Night.IconPhrase === 'Showers'
            || weather.Day.IconPhrase === 'Mostly Cloudy w/ Showers' || weather.Day.IconPhrase === 'Partly Sunny w/ Showers') {
            img.src = '../assets/img/shower.png';
        } else if(weather.Day.IconPhrase === 'Intermittent clouds' || weather.Night.IconPhrase === 'Intermittent clouds') {
            img.src = '../assets/img/part-cloudy.png';
        } else if(weather.Day.IconPhrase === 'Sunny' || weather.Day.IconPhrase === 'Mostly sunny'
            || weather.Day.IconPhrase === 'Clear') {
            img.src = '../assets/img/sun.png';
        } else if(weather.Day.IconPhrase === 'Snow' || weather.Day.IconPhrase === 'Flurries' || weather.Day.IconPhrase === 'Freezing rain'
            || weather.Day.IconPhrase === 'Rain and snow') {
            img.src = '../assets/img/snowing.png';
        } else if(weather.Day.IconPhrase === 'T-Storms') {
            img.src =  '../assets/img/storm.png';
        } else if(weather.Day.IconPhrase === 'Ice' || weather.Day.IconPhrase === 'Freezing Rain'
            || weather.Day.IconPhrase === 'Cold'){
            img.src = '../assets/img/freezy.png';
        } else if(weather.Day.IconPhrase === 'Hot' || weather.Night.IconPhrase === 'Hot') {
            img.src = '../assets/img/hot.png';
        } else if(weather.Day.IconPhrase === 'Windy' || weather.Night.IconPhrase === 'Windy') {
            img.src = '../assets/img/wind.png';
        }

        const temperature = document.createElement('p');
        temperature.className = 'weather__temperature';
        temperature.innerHTML = `<span class="weather__title">Minimum:</span> ${temperatureConversion(weather.Temperature.Minimum.Value)} °C <br> 
                                         <span class="weather__title">Maximum:</span> ${temperatureConversion(weather.Temperature.Maximum.Value)} °C`;

        const phase = document.createElement('p');
        phase.className = 'weather__phase';
        phase.innerHTML = `<span class="weather__title">Phase in night:</span> ${weather.Day.IconPhrase}<br> 
                                    <span class="weather__title">Phase in day:</span> ${weather.Night.IconPhrase}`;

        const divInformation = document.querySelector('.weather__information');
        const divBlockOneDay = document.createElement('div');
        divBlockOneDay.className = 'weather__information-block';
        divBlockOneDay.append(dateElement, img, temperature, phase);
        divInformation.append(divBlockOneDay);
    }
}

const buttonsNeighbors = document.querySelector(".buttons");

const appendButtonNeighbors = (name, key) => {
    const btnNeighbor = document.createElement("button");
    btnNeighbor.className = "button-neighbors";
    btnNeighbor.innerHTML = name;
    btnNeighbor.id = key;

    buttonsNeighbors.appendChild(btnNeighbor);
};

function showButtons(location){
    document.querySelector('.buttons').innerHTML = '';

    location.forEach((data) => {
        appendButtonNeighbors(data.LocalizedName, data.Key);
    })
}

async function getWeatherLocation(city){
    const URL_WEATHER = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?apikey=${API_KEY}`

    try{
        const response = await fetch(URL_WEATHER)
        if (response.status === 200) {
            const parsedJSON = await response.json();
            showWeather(parsedJSON);
        }
    } catch (e){
        console.error(e)
    }
}

async function getButtonNeighbors(city){
    const URL_NEIGHBORS = `http://dataservice.accuweather.com/locations/v1/cities/neighbors/${city}?apikey=${API_KEY}`;

    try{
        const response = await fetch(URL_NEIGHBORS)
        if (response.status === 200) {
            const parsedJSON = await response.json();
            showButtons(parsedJSON);
        }
    } catch (e){
        console.error(e)
    }
}

buttonGetWeather.addEventListener('click', () =>{
    getWeatherLocation(getLocationKey());
    getButtonNeighbors(getLocationKey());
});

buttonsNeighbors.addEventListener('click', (event) => {
    const cityKey = event.target.id;
    getWeatherLocation(cityKey);
    getButtonNeighbors(cityKey);
})


