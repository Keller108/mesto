import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._button = this._form.querySelector('.form__submit-btn');
    }

    setSubmitAction(action) {
        this._submitHandler = action
    }

    enableButton(object) {
        this._button.classList.remove(object);
        this._button.setAttribute('enabled', 'enabled')
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault()
            this._submitHandler()
        })
    }
}