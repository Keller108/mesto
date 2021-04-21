import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, data) {
        super(popupSelector);
        this._handleSubmitForm = handleFormSubmit;
        this._form = document.querySelector('.form').closest('.popup').classList.contains('popup_opened');
        this._btnSubmit = document.querySelector('.form__submit-btn').closest('.popup').classList.contains('popup_opened');
    }

    _getInputValues() {
        // Собирает данные со всех полей
    }

    setEventListeners() {
        super.setEventListeners();

        // Помимо добавления обработчика закрытия на крестик добавляет обработчик сабмита формы
        //     this._btnSubmit.addEventListener('submit', () => {
        //         this._form = this.handleFormSubmit();
        //         this.close();
        //     })
    }

    close(evt) {
        super.close();
        // Сбрасывает форму при закрытии
    }
}