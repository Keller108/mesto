export default class UserInfo {
    constructor(data) {
        this._name = data.name;
        this._about = data.about;
        this._userAvatar = data.avatar;

    }

    // Метод получения информацию о юзере
    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        }
    }

    // Метод принимает данные юзера и добавляет их на страницу
    setUserInfo(userData) {
        this._name.textContent = userData.name;
        this._about.textContent = userData.about;
    }

    setAvatar(avatar) {
        this._userAvatar.setAttribute('style', `background-image: url("${avatar}")`)
    }
}