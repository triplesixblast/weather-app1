import { updateWeatherInfo } from './api.js'
import { domElements, utils, cityInput, searchBtn } from './dom.js'
import { saveLastSearch, getLastSearch } from './storage.js'

//инициализация приложения с помощью DOM-элементов
document.addEventListener('DOMContentLoaded', () => {
    const lastSearch = getLastSearch()
    if (lastSearch) {
        updateWeatherInfo(lastSearch, domElements, utils)
    }
});

//обработка поискового запроса
function handleSearch() {
    const city = cityInput.value.trim()
    if (city !== '') {
        updateWeatherInfo(city, domElements, utils)
        saveLastSearch(city)
        cityInput.value = ''
        cityInput.blur()
    }
}

//поиск по нажатию на enter
searchBtn.addEventListener('click', handleSearch)

//обратчик нажатия enter
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSearch()
    }
});