import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._popup = document.querySelector(popupSelector);
    }

    _getInputValues() {
        // Собирает данные со всех полей
        this._inputList = this._form.querySelectorAll('.form__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _submitHandler = evt => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandler);
    }

    close() {
        super.close();
        // Сбрасывает форму при закрытии
        this._form.reset();
        this._form.removeEventListener('submit', this.__submitHandler)
    }
}