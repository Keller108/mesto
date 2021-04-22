import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
    }

    _getInputValues() {
        // Собирает данные со всех полей
        this._inputList = this._form.querySelectorAll('.form__input');
        this.formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        // Помимо добавления обработчика закрытия на крестик добавляет обработчик сабмита формы
        this._form.addEventListener('submit', (evt) => {
            this._handleFormSubmit();
            evt.preventDefault(evt);
        })
    }

    close() {
        super.close();
        // Сбрасывает форму при закрытии
        this._form.reset();
    }
}