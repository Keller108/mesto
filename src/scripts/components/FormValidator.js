export default class FormValidator {
    constructor(object, popupForm) {
        this._object = object;
        this._popupForm = popupForm;
    }

    // Ф-ция, проверяющая все ли инпуты пустые
    _allInputsEmpty(inputList) {
        return !inputList.some(inputElement => inputElement.value.length > 0);
    };

    // Проверка на невалидность хотя бы одного инпута 
    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => !inputElement.validity.valid);
    };

    // Функция отключения кнопки submit 
    disableSubmitBtn(btn) {
        btn.classList.add(this._object.inactiveButtonClass);
        btn.setAttribute('disabled', true);
    };

    // Функция включения кнопки submit 
    _enableSubmitBtn(btn) {
        btn.classList.remove(this._object.inactiveButtonClass);
        btn.removeAttribute('disabled');
    };

    _checkInput(formElement, inputElement) {
        if (inputElement.validity.valid) {
            this.hideInputError(formElement, inputElement);
        } else {
            this.showInputError(formElement, inputElement, inputElement.validationMessage);
        }
    };

    // Навесим слушалки на все инпуты
    _setInputListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._object.inputSelector));
        const buttonElement = formElement.querySelector(this._object.submitButtonSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInput(formElement, inputElement);
                this.toggleButtonState(inputList, buttonElement);
            });
        });
        this.toggleButtonState(inputList, buttonElement);
    };

    // Ф-йия переключения состояния кнопки
    toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList) || this._allInputsEmpty(inputList)) {
            this.disableSubmitBtn(buttonElement);
        } else {
            this._enableSubmitBtn(buttonElement);
        }
    };

    // Покажем ошибку
    showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._object.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._object.errorClass);
    };

    // Спрячем ошибку
    hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._object.inputErrorClass);
        errorElement.classList.remove(this._object.errorClass);
        errorElement.textContent = '';
    };

    // Опишем функцию включения валидации
    enableValidation() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setInputListeners(this._popupForm);

    };

    // Удаление ошибок
    removeErrors() {
        const inputList = Array.from(this._popupForm.querySelectorAll(this._object.inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.classList.remove(this._object.inputErrorClass);
        });

        const errorList = Array.from(this._popupForm.querySelectorAll('.input-error'));
        errorList.forEach((errorElement) => {
            errorElement.classList.remove(this._object.errorClass);
            errorElement.textContent = '';
        });
    }
}