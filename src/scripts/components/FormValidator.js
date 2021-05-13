export default class FormValidator {
    constructor(object, popupForm) {
        this._object = object;
        this._popupForm = popupForm;
        this._button = this._popupForm.querySelector('.form__submit-btn');
        this._inputList = Array.from(this._popupForm.querySelectorAll(this._object.inputSelector));
    }

    // Ф-ция, проверяющая все ли инпуты пустые
    _allInputsEmpty() {
        return !this._inputList.some(inputElement => inputElement.value.length > 0);
    };

    // Проверка на невалидность хотя бы одного инпута 
    _hasInvalidInput() {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    };

    // Функция отключения кнопки submit 
    disableSubmitBtn() {
        this._button.classList.add(this._object.inactiveButtonClass);
        this._button.setAttribute('disabled', true);
    };

    // Функция включения кнопки submit 
    _enableSubmitBtn() {
        this._button.classList.remove(this._object.inactiveButtonClass);
        this._button.removeAttribute('disabled');
    };

    _checkInput(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    };

    _reset() {
        this._popupForm.addEventListener('reset', () => {
            this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement)
            })
            this.disableSubmitBtn();
        });
    }

    // Навесим слушалки на все инпуты
    _setInputListeners() {

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement);
                this._toggleButtonState();
            });
        });
        this._toggleButtonState();
        this._reset();
    };

    // Ф-йия переключения состояния кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput() || this._allInputsEmpty()) {
            this.disableSubmitBtn();
        } else {
            this._enableSubmitBtn();
        }
    };

    // Покажем ошибку
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._object.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._object.errorClass);
    };

    // Спрячем ошибку
    _hideInputError(inputElement) {
        const errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._object.inputErrorClass);
        errorElement.classList.remove(this._object.errorClass);
        errorElement.textContent = '';
    };

    // Опишем функцию включения валидации
    enableValidation() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setInputListeners();

    };
}