export default class Api {
    constructor(config) {
        this._config = config;
    }

    // Получение карточек с сервера
    getAllCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', this._config)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка: ${res.status}`)
            )
    }

    // Получение информации о профиле с сервера
    getInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', this._config)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка: ${res.status}`)
            )
    }

    // Отправка информации профиля
    sendInfo(inputsValue) {
        const newData = {
            ...this._config,
            body: JSON.stringify(inputsValue),
            method: 'PATCH',
        }
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', newData)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка: ${res.status}`)
            )
    }


}