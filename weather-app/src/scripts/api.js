//получение API ключа
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

//получение данных с API
export async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&units=metric&appid=${apiKey}`
    
    const response = await fetch(apiUrl)
    return response.json()
}

//определение иконки погоды
export function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg'
    else if (id <= 321) return 'drizzle.svg'
    else if (id <= 531) return 'rain.svg'
    else if (id <= 622) return 'snow.svg'
    else if (id <= 781) return 'atmosphere.svg'
    else if (id <= 800) return 'clear.svg'
    else return 'clouds.svg'
}

//обновление информации о погоде
export async function updateWeatherInfo(city, domElements, utils) {
    const weatherData = await getFetchData('weather', city)

    if (weatherData.cod != 200) {
        utils.showDisplaySection(domElements.notFoundSection)
        return
    }

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData
    
    domElements.countryTxt.textContent = country
    domElements.tempTxt.textContent = Math.round(temp) + ' ℃'
    domElements.conditionTxt.textContent = main
    domElements.humidityValueTxt.textContent = humidity + '%'
    domElements.windValueTxt.textContent = speed + ' m/s'
    domElements.currentDateTxt.textContent = utils.getCurrentDate()

    domElements.weatherSummaryImg.src = `/src/media/weather/${getWeatherIcon(id)}`

    await updateForecastsInfo(city, domElements)
    utils.showDisplaySection(domElements.weatherInfoSection)
}

//обновление прогноза погоды
async function updateForecastsInfo(city, domElements) {
    const forecastsData = await getFetchData('forecast', city)
    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    domElements.forecastItemsContainer.innerHTML = ''
    forecastsData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastsItems(forecastWeather, domElements)
        }
    })
}

//создание/обновление элементов прогноза
function updateForecastsItems(weatherData, domElements) {
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = weatherData

    const dateTaken = new Date(date);
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }

    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption)

    const forecastItem = `
        <div class="forecast-item">
            <h5 class="forecast-date regular-txt">${dateResult}</h5>
            <img src="/src/media/weather/${getWeatherIcon(id)}" class="forecast-item-img">
            <h5 class="forecast-temp">${Math.round(temp)} ℃</h5>
        </div>
    `;

    domElements.forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem)
}