export default class Api {
    constructor(config) {
        this._config = config;
    }

    // Получение карточек с сервера
    getAllCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', this._config)
            .then(this._checkResponse)
    }

    // Получение информации о профиле с сервера
    getInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', this._config)
            .then(this._checkResponse)
    }

    // Отправка информации профиля
    sendInfo(inputsValue) {
        const dataObject = {
            method: 'PATCH',
            ...this._config,
            body: JSON.stringify(inputsValue),
        }
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', dataObject)
            .then(this._checkResponse)
    }

    // Добавление карточек на сервак
    uploadCard(inputsValue) {
        const dataObject = {
            method: 'POST',
            ...this._config,
            body: JSON.stringify(inputsValue),
        }
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', dataObject)
            .then(this._checkResponse)
    }

    // Удаление карточки
    removeCard(cardId) {
        const dataObject = {
            method: 'DELETE',
            ...this._config
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/${cardId}`, dataObject)
            .then(this._checkResponse)
    }

    //Ставим лайк
    putLike(cardId) {
        const dataObject = {
            method: 'PUT',
            ...this._config
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${cardId}`, dataObject)
            .then(this._checkResponse)
    }

    //Удаляем лайк
    removeLike(cardId) {
        const dataObject = {
            method: 'DELETE',
            ...this._config
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/cards/likes/${cardId}`, dataObject)
            .then(this._checkResponse)
    }

    updateAvatar(data) {
        const dataObject = {
            method: 'PATCH',
            ...this._config,
            body: JSON.stringify(data)
        }
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-23/users/me/avatar`, dataObject)
            .then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }


}