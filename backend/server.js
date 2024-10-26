const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cron = require("node-cron");
const weatherService = require("./services/weatherService");
const Weather = require("./models/Weather");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware
app.use(express.json());
app.use(express.static("frontend"));

// Scheduled task to fetch weather data every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  await weatherService.fetchAndSaveWeatherData();
});

// Route to get daily summaries
app.get("/api/summaries", async (req, res) => {
  const summaries = await Weather.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        averageTemp: { $avg: "$temp" },
        maxTemp: { $max: "$temp" },
        minTemp: { $min: "$temp" },
        dominantWeather: { $first: "$weather" },
        avgPressure: { $avg: "$pressure" },
      },
    },
  ]);
  res.json(summaries);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
