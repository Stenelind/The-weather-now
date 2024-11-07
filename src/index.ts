import { ApiResponse } from '../interface/interface';

const API = 'ab65f288711882703ee086db2c5b75ce';
const URL = 'https://api.weatherstack.com/current';

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('#searchButton') as HTMLButtonElement;
    const cityInput = document.querySelector('#cityInput') as HTMLInputElement;

    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    if (lastSearchedCity) {
        cityInput.value = lastSearchedCity;
        fetchWeather(lastSearchedCity);
    }

    if (searchButton) {
        searchButton.addEventListener('click', async () => {
            const cityName = cityInput.value;
            if (cityName) {
                await fetchWeather(cityName);
            }
        });
    } else {
        console.error('Search button not found');
    }
});

async function fetchWeather(city: string): Promise<void> {
    try {
        const response = await fetch(`${URL}?access_key=${API}&query=${city}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        displayWeather(data);

        localStorage.setItem('lastSearchedCity', city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        
    }
}

function displayWeather(data: ApiResponse): void {
    const weatherDiv = document.querySelector('#weatherResult');
    
    const localtime = new Date(data.location.localtime);
    const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(localtime);
    const formattedTime = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(localtime);
    
    if (weatherDiv && data.location && data.current) {
        weatherDiv.innerHTML = `
            <h2 class="weather-header">${data.location.name}, ${data.location.country}</h2>
            <p>${formattedDate} ${formattedTime}</p>
            <p>Description: ${data.current.weather_descriptions.join(', ')}</p>
            <section class="img_temp">
            <img class="weather-img" src="${data.current.weather_icons[0]}" alt="Weather-icon">
            <p class="temp">${data.current.temperature}°C</p>
            </section>
            <p>Feels like: ${data.current.feelslike}°C</p>
            <p>Wind: ${data.current.wind_speed} km/h ${data.current.wind_dir}</p>
            <p>Pressure: ${data.current.pressure} hPa</p>
        `;
    } else {
        console.error('Error: Unable to retrieve weather data.');
    }
}
