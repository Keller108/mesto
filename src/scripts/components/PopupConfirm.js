import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._form = this._popup.querySelector('.form');
    }

    setSubmitAction(action) {
        this._handleFormSubmit = action;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListeners('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit();
        })
    }

    close() {
        super.close();
        this._form.removeEventListeners('submit', this._handleFormSubmit);
    }
}