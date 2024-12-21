const API_KEY = "19b599fc3c4299657aa750994dd7a553"; // Your API Key
const searchBtn = document.querySelector("button");
const input = document.querySelector("input");
const container = document.querySelector(".container");
const weatherInfo = document.querySelector(".weather-info");

searchBtn.addEventListener("click", async () => {
  const city = input.value.trim();
  if (!city) {
    weatherInfo.innerHTML = `<p>Please enter a city name!</p>`;
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      weatherInfo.innerHTML = `<p>City not found. Please try again!</p>`;
      return;
    }

    const data = await response.json();
    const { name, main, weather } = data;
    const condition = weather[0].main.toLowerCase();

    // Update weather info
    weatherInfo.innerHTML = `
      <h2>${name}</h2>
      <p>Temperature: ${main.temp}°C</p>
      <p>Condition: ${weather[0].description}</p>
    `;

    // Update background and animations based on weather condition
    document.body.className = ""; // Reset existing class
    if (condition.includes("sun")) {
      document.body.classList.add("sunny");
    } else if (condition.includes("cloud")) {
      document.body.classList.add("cloudy");
    } else if (condition.includes("rain")) {
      document.body.classList.add("rainy");
    } else if (condition.includes("storm")) {
      document.body.classList.add("stormy");
    } else if (condition.includes("wind")) {
      document.body.classList.add("windy");
    } else {
      document.body.classList.add("default");
    }
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again later!</p>`;
    console.error("Error:", error);
  }
});
