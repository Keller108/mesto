export default class UserInfo {
    constructor({ name, job }) {
        this._personName = document.querySelector(name);
        this._personJob = document.querySelector(job);
    }

    // Метод получения информацию о юзере
    getUserInfo() {
        return {
            name: this._personName.textContent,
            job: this._personJob.textContent
        }
    }

    // Метод принимает данные юзера и добавляет их на страницу
    setUserInfo(data) {
        this._personName.textContent = data.profileName;
        this._personJob.textContent = data.profileJob;
    }
}