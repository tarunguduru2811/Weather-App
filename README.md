# Weather App

A simple weather application that displays the current weather based on your location or searched city. This app uses IP-based geolocation to detect your approximate location and fetch weather data from the OpenWeatherMap API.

---

## Features

- Detects user location using IP-based geolocation (no browser permission required).
- Fetches current weather data from OpenWeatherMap using coordinates or city name.
- Displays temperature, humidity, wind speed, weather description, cloudiness, and country flag.
- Switch between "Current Location" and "Search by City" tabs.
- Handles loading and error states gracefully.

---

## Demo

https://weather-app-cmqs.onrender.com/

## How It Works

- On clicking "Grant Location," the app fetches your approximate latitude and longitude via IP geolocation.
- Uses these coordinates to fetch weather data from OpenWeatherMap.
- Alternatively, you can search for weather in any city using the search tab.

---

## Technologies Used

- HTML, CSS, JavaScript (vanilla)
- OpenWeatherMap API
- IP Geolocation API (https://ipapi.co/json/)
- Session Storage for storing user coordinates
  
---

## Setup & Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/weather-app.git
    ```
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge).
3. To get your own API key from OpenWeatherMap:
    - Sign up at [OpenWeatherMap](https://openweathermap.org/api).
    - Replace the `API_KEY` value in `script.js` with your own key.


---

## Usage

- Click on **Grant Location** to fetch weather data for your current location (IP-based).
- Switch to the **Search** tab and enter a city name to get weather details for any location.
- Weather details including temperature, humidity, wind speed, and conditions will be displayed.

---




