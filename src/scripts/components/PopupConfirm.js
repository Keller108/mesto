import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.submit-btn');
    }

    setSubmitAction(action) {
        this._submitHandler = action
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => {
            this._submitHandler();
        })
    }
}