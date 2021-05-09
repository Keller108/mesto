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
            method: 'PATCH',
            ...this._config,
            body: JSON.stringify(inputsValue),
        }
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', newData)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка: ${res.status}`)
            )
    }

    // Добавление карточек на сервак
    uploadCard(inputsValue) {
        const newCard = {
            method: 'POST',
            ...this._config,
            body: JSON.stringify(inputsValue),
        }
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', newCard)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка: ${res.status}`)
            )
    }

    // Удаление карточки
    removeCard(cardId) {
        const newData = {
            method: 'DELETE',
            ...this._config
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/${cardId}`, newData)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка: ${res.status}`)
            )
    }

    //Ставим лайк
    putLike(cardId) {
        const newData = {
            method: 'PUT',
            ...this._config
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${cardId}`, newData)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка: ${res.status}`)
            )
    }

    //Удаляем лайк
    removeLike(cardId) {
        const newData = {
            method: 'DELETE',
            ...this._config
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${cardId}`, newData)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка: ${res.status}`)
            )
    }

    updateAvatar(data) {
        const dataObject = {
            method: 'PATCH',
            ...this._config,
            body: JSON.stringify(data)
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/users/me/avatar`, dataObject)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка: ${res.status}`)
            )
    }


}