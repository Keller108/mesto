import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleSubmitForm = handleFormSubmit;
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
        this._btnSubmit.addEventListener('submit', () => {
            this._form = this.handleFormSubmit();
            this.close();
        })
    }

    close(evt) {
        super.close();
        // Сбрасывает форму при закрытии
    }
}