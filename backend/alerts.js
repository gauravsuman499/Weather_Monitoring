// User-configurable thresholds
const alertConfig = {
  temperatureThreshold: 35, // degrees Celsius
  consecutiveAlerts: 2, // Number of consecutive alerts before notifying
  weatherConditions: ["Rain", "Snow"], // Specific conditions to alert on
};

// To keep track of alerts
let alertCount = {};

// Function to check and log alerts
async function checkForAlerts(weatherData) {
  const { city, temp, weather } = weatherData;

  // Initialize alert count for the city if not set
  if (!alertCount[city]) {
    alertCount[city] = { count: 0 };
  }

  // Check temperature thresholds
  if (temp > alertConfig.temperatureThreshold) {
    alertCount[city].count++;
  } else {
    alertCount[city].count = 0; // Reset count if below threshold
  }

  // Check specific weather conditions
  if (alertConfig.weatherConditions.includes(weather)) {
    alertCount[city].count++;
  }

  // Log alert if conditions met
  if (alertCount[city].count >= alertConfig.consecutiveAlerts) {
    logAlert(city, temp, weather);
    alertCount[city].count = 0; // Reset after alert
  }
}

// Function to log alert to the console
function logAlert(city, temp, weather) {
  console.log(
    `ALERT! The temperature in ${city} has reached ${temp}°C with conditions: ${weather}.`
  );
}

// Expose the function to check alerts
module.exports = { checkForAlerts };
