const LAST_SEARCH_KEY = 'lastWeatherSearch'

//сохранение последнего запроса
export function saveLastSearch(city) {
    try {
        localStorage.setItem(LAST_SEARCH_KEY, city.trim())
        return true
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error)
        return false
    }
}

//получение последнего запроса
export function getLastSearch() {
    try {
        return localStorage.getItem(LAST_SEARCH_KEY)
    } catch (error) {
        console.error('Ошибка при чтении из localStorage:', error)
        return null
    }
}

//проверка существования запроса
export function hasLastSearch() {
    return getLastSearch() !== null
}