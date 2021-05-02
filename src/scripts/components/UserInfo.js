export default class UserInfo {
    constructor(data) {
        this._data = data
    }

    // Метод получения информацию о юзере
    getUserInfo() {
        return {
            name: this._data.name.textContent,
            about: this._data.about.textContent
        }
    }

    // Метод принимает данные юзера и добавляет их на страницу
    setUserInfo(userData) {
        this._data.name.textContent = userData.name;
        this._data.about.textContent = userData.about;
    }
}