import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.form__submit-btn');
    }

    setSubmitAction(action) {
        this._submitHandler = action
    }

    enableButton(object) {
        this._button.classList.remove(object);
        this._button.removeAttribute('disabled', 'disabled')
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._submitHandler();
        })
    }
}