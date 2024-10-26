// Weather data schema

const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  city: String,
  temp: Number,
  feels_like: Number,
  weather: String,
  humidity: Number,
  pressure: Number,
});

module.exports = mongoose.model("Weather", weatherSchema);
