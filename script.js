const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector("[data-weather-container]");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector(".form-container");
const userInfoContainer = document.querySelector(".user-info-container");
const loadinScreen = document.querySelector(".loading-container");


let currentTab = userTab;
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");
getfromSessionStotage();

function switchTab(clickedTab){
    if(clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");
    

    if(!searchForm.classList.contains("active")){
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
    }
    else{
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        getfromSessionStotage();
    }
  }
}

function getfromSessionStotage(){
    let localCoordinates = sessionStorage.getItem("user-coordinates");
     if(!localCoordinates ){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const { lat, lon } = coordinates;
    // console.log(coordinates);
    grantAccessContainer.classList.remove("active");
    loadinScreen.classList.add("active");
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        loadinScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeather(data);
    }
    catch(error){
        loadinScreen.classList.remove("active");
    }
}

function renderWeather(weatherInfo){
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
    weatherIcon.src =`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}


userTab.addEventListener("click",()=>{
    switchTab(userTab);
});


searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
});

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( showPosition)
    }
    else{
        console.log("coordinates not found");
    }
}
    function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    console.log("userCoordinates",userCoordinates);
    console.log(userCoordinates);
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
     return;
    else
     fetchSearchWeather(cityName);
})

async function fetchSearchWeather(city){
    loadinScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        loadinScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeather(data);
    }
    catch(error){
    
    }
    
}
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);