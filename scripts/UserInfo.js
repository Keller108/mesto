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
    setUserInfo(newData) {
        this._personName.textContent = newData.name;
        this._personJob.textContent = newData.job;

        //         profileName.textContent = fieldName.value;
        // profileDescription.textContent = fieldDescr.value;
    }
}