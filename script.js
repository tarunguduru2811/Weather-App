const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector("[data-weather-container]");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector(".form-container");
const userInfoContainer = document.querySelector(".user-info-container");
const loadingScreen = document.querySelector(".loading-container");


let currentTab = userTab;
const API_KEY = "a91ecb0a7915b0151d5f4f520c5009b2";
currentTab.classList.add("current-tab");
getfromSessionStotage();

function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");


        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStotage();
        }
    }
}

function getfromSessionStotage() {
    let localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

// async function fetchUserWeatherInfo(coordinates) {
//     const { lat, lon } = coordinates;
//     console.log(coordinates);
//     grantAccessContainer.classList.remove("active");
//     loadingScreen.classList.add("active");
//     try {
//         const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
//         const data = await res.json();
//         loadingScreen.classList.remove("active");
//         userInfoContainer.classList.add("active");
//         renderWeather(data);
//     }
//     catch (error) {
//         loadingScreen.classList.remove("active");
//     }
// }

function renderWeather(weatherInfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}


userTab.addEventListener("click", () => {
    switchTab(userTab);
});


searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

async function getLocationByIP() {
    loadingScreen.classList.add("active");
    try {
        const res = await fetch("https://ip-api.com/json")
            .then(res => res.json())
            .then(data => {
                return data;
            })
            .catch(err => console.error(err));

        const data = res;
        loadingScreen.classList.remove("active");
        if (data.status === "success") {
            const userCoordinates = {
                lat: data.lat,
                lon: data.lon,
            };
            console.log("IP-based coordinates:", userCoordinates);
            sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
            fetchUserWeatherInfo(userCoordinates);
        } else {
            alert("Unable to detect location from IP.");
            grantAccessContainer.classList.add("active");
        }
    } catch (error) {
        loadingScreen.classList.remove("active");
        alert("Error fetching IP location.");
        console.error(error);
    }
}

function getLocation() {
    getLocationByIP();
}

function handleLocationError(error) {
    console.error("Geolocation Error:", error);
    alert("Failed to get your location. Please allow location access.");
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };
    console.log("User coordinates:", userCoordinates);
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    console.log("Fetching weather for:", coordinates);
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        console.log("API Response:", data);

        loadingScreen.classList.remove("active");
        if (data?.cod === 200) {
            userInfoContainer.classList.add("active");
            renderWeather(data);
        } else {
            alert("Failed to fetch weather. Please try again.");
        }
    } catch (error) {
        loadingScreen.classList.remove("active");
        console.error("Error fetching weather:", error);
        alert("Something went wrong. Please try again.");
    }
}

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if (cityName === "")
        return;
    else
        fetchSearchWeather(cityName);
})

async function fetchSearchWeather(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeather(data);
    }
    catch (error) {

    }

}
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);