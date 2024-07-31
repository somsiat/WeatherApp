const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
    const APIKey = 'dcc6ae088fb8919638ba863eb5986788';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                alert(`I can't find this City`);
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const pressure = document.querySelector('.weather-details .pressure span');

            const currentTime = json.dt;
            const sunriseTime = json.sys.sunrise;
            const sunsetTime = json.sys.sunset;

            const isDayTime = currentTime >= sunriseTime && currentTime < sunsetTime;

            switch (json.weather[0].main) {

                case 'Clear':
                        image.src = isDayTime ? 'img/sun.png' : 'img/moon.png';
                    break;

                case 'Clouds':
                        image.src = 'img/cloud.png';
                    break;

                case 'Rain':
                        image.src = 'img/rain.png';
                    break;

                case 'Thunderstorm':
                        image.src = 'img/thunderstorm.img' ;
                    break;
                
                case 'Snow':
                        image.src = 'img/snow.png';
                    break;

                case 'Partly Cloudy':
                    image.src = 'img/cloudy.png';
                break;

                case 'Fog':
                    image.src = 'img/fog.png';
                break;

            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
            pressure.innerHTML = `${json.main.pressure} hPa`;

            weatherBox.style.visibility = 'visible';
            weatherDetails.style.visibility = 'visible';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
