const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {

    const APIKey = 'dcc6ae088fb8919638ba863eb5986788';
    const city = document.querySelector('.search-box input').value;

    if(city== '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&
    appid${APIKey}`).then(Response => Response.json()).then(json => {
        
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {

            case 'Sun':
                image.src = 'img/sun.png'
            break;

            case 'Clouds':
                image.src = 'img/clouds.png'
            break;

            case 'Cloudy':
                image.src = 'img/cloudy.png'
            break;

            case 'Rain':
                image.src = 'img/rain.png'
            break;

            default:
                image.src='img/sun.gif';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.main.speed)}km/h`;

    }) 
})