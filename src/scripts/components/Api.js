export default class Api {
    construtor(config) {
        this._config = config;
    }

    // getAllCards() {
    //     return fetch('https://mesto.nomoreparties.co/v1/cohort-23/cards', this._config)
    //         .then(res => res.ok ?
    //             res.json() :
    //             Promise.reject(`Ошибка - ${res.status}`)
    //         )
    // }

    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-23/users/me', this._config)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка - ${res.status}`)
            )
    }
}