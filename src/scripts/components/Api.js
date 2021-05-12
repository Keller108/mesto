export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._config = config;
    }

    // Получение карточек с сервера
    getAllCards() {
        return fetch(`${this._baseUrl}/cards`, this._config)
            .then(this._checkResponse)
    }

    // Получение информации о профиле с сервера
    getInfo() {
        return fetch(`${this._baseUrl}/users/me`, this._config)
            .then(this._checkResponse)
    }

    // Отправка информации профиля
    sendInfo(inputsValue) {
        const dataObject = {
            method: 'PATCH',
            ...this._config,
            body: JSON.stringify(inputsValue),
        }
        return fetch(`${this._baseUrl}/users/me`, dataObject)
            .then(this._checkResponse)
    }

    // Добавление карточек на сервак
    uploadCard(inputsValue) {
        const dataObject = {
            method: 'POST',
            ...this._config,
            body: JSON.stringify(inputsValue),
        }
        return fetch(`${this._baseUrl}/cards`, dataObject)
            .then(this._checkResponse)
    }

    // Удаление карточки
    removeCard(cardId) {
        const dataObject = {
            method: 'DELETE',
            ...this._config
        }
        return fetch(`${this._baseUrl}/cards/${cardId}`, dataObject)
            .then(this._checkResponse)
    }

    //Ставим лайк
    putLike(cardId) {
        const dataObject = {
            method: 'PUT',
            ...this._config
        }
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, dataObject)
            .then(this._checkResponse)
    }

    //Удаляем лайк
    removeLike(cardId) {
        const dataObject = {
            method: 'DELETE',
            ...this._config
        }
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, dataObject)
            .then(this._checkResponse)
    }

    updateAvatar(data) {
        const dataObject = {
            method: 'PATCH',
            ...this._config,
            body: JSON.stringify(data)
        }
        return fetch(`${this._baseUrl}/users/me/avatar`, dataObject)
            .then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }


}