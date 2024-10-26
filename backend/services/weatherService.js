const axios = require("axios");
const Weather = require("../models/Weather");
const alerts = require("../alerts");

const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

async function fetchAndSaveWeatherData() {
  try {
    for (const city of cities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
      const { temp, feels_like, humidity, pressure } = response.data.main;
      const weather = response.data.weather[0].main;

      const weatherData = new Weather({
        city,
        temp,
        feels_like,
        weather,
        humidity,
        pressure,
      });

      await weatherData.save();
      console.log(`Saved weather data for ${city}`);

      // Check for alerts based on the weather data
      await alerts.checkForAlerts(weatherData);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

module.exports = { fetchAndSaveWeatherData };
