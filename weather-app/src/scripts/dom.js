//элементы ввода и поиска
export const cityInput = document.querySelector('.city-input')
export const searchBtn = document.querySelector('.search-btn')

//секции приложения
export const weatherInfoSection = document.querySelector('.weather-info')
export const notFoundSection = document.querySelector('.not-found')
export const searchCitySection = document.querySelector('.search-city')

//элементы отображения погодных данных
export const countryTxt = document.querySelector('.country-txt')
export const tempTxt = document.querySelector('.temp-txt')
export const conditionTxt = document.querySelector('.condition-txt')
export const humidityValueTxt = document.querySelector('.humidity-value-txt')
export const windValueTxt = document.querySelector('.wind-value-txt')
export const weatherSummaryImg = document.querySelector('.weather-summary-img')
export const currentDateTxt = document.querySelector('.current-date-txt')

//контейнер прогноза
export const forecastItemsContainer = document.querySelector('.forecast-items-container')

//получение текущей даты
export function getCurrentDate() {
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    };
    
    return currentDate.toLocaleDateString('en-GB', options)
}

//переключение секция
export function showDisplaySection(section) {
    const sections = [weatherInfoSection, searchCitySection, notFoundSection]
    sections.forEach(sec => sec.style.display = 'none')
    section.style.display = 'flex'
}

//группировка DOM-элементов
export const domElements = {
    cityInput,
    searchBtn,
    weatherInfoSection,
    notFoundSection,
    searchCitySection,
    countryTxt,
    tempTxt,
    conditionTxt,
    humidityValueTxt,
    windValueTxt,
    weatherSummaryImg,
    currentDateTxt,
    forecastItemsContainer
};

//группировка DOM-утилит
export const utils = {
    getCurrentDate,
    showDisplaySection
};