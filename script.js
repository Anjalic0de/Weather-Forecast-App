const apiKey = 'cf3861d25729f27b5ea43342a0d5c2ac';  // Replace with your API key

// Function to fetch current weather data
async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = 'Error: ' + error.message;
    }
}

// Function to display current weather data
function displayWeather(data) {
    const weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    document.getElementById('weatherInfo').innerHTML = weatherInfo;
}
// Function to fetch 5-day forecast data
async function getWeatherForecast() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = 'Error: ' + error.message;
    }
}

// Function to display 5-day forecast data
function displayForecast(data) {
    const forecastDiv = document.getElementById('weatherInfo');
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>';

    // Extract one forecast per day (noon)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt).toDateString();
        forecastDiv.innerHTML += `
            <div class="forecast-day">
                <h3>${date}</h3>
                <p>Temperature: ${day.main.temp}°C</p>
                <p>Weather: ${day.weather[0].main}</p>
            </div>
        `;
    });
}
// Function to fetch weather data based on user's location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function getWeatherByCoordinates(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Location not found');
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = 'Error: ' + error.message;
    }
}
