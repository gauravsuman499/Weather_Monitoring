async function fetchWeatherSummaries() {
  //   const response = await fetch("/api/summaries");
  const response = await fetch("http://localhost:3000/api/summaries");
  const summaries = await response.json();
  const summariesDiv = document.getElementById("weather-summaries");

  summariesDiv.innerHTML = "";
  summaries.forEach((summary) => {
    summariesDiv.innerHTML += `
            <div>
                <h2>${summary._id}</h2>
                <p>Average Temperature: ${summary.averageTemp.toFixed(2)} °C</p>
                <p>Max Temperature: ${summary.maxTemp} °C</p>
                <p>Min Temperature: ${summary.minTemp} °C</p>
                <p>Dominant Weather: ${summary.dominantWeather}</p>
                <p>Average Pressure: ${summary.avgPressure}</p>
            </div>
        `;
  });
}

// Fetch summaries on page load
fetchWeatherSummaries();
