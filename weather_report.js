function showweatherDetails(event) {
  event.preventDefault(); // Prevent the default link behavior

  const city = document.getElementById("city").value;

  const apiKey = "b5b3b101e4062591a41e1b9f0b06c4a2"; // Replace with your OpenWeatherMap API key

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // OpenWeatherMap API endpoint for current weather data by city name
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherInfo = document.getElementById("weatherInfo");
      weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                  <p>Temperature: ${data.main.temp} &#8451;</p>
                                  <p>Weather: ${data.weather[0].description}</p>`;
    })
    .catch((error) => {
        console.error("Error fetching weather data:", error);
        const weatherInfo = document.getElementById("weatherInfo");
        weatherInfo.innerHTML = `<p> Failed to fetch weather data. Please try again later.</p>`;
    });
}

document.getElementById("weatherForm").addEventListener("submit", showweatherDetails);


