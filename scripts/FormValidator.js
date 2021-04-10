export default class FormValidator {
<<<<<<< HEAD
    constructor(object, formElement) {
        this._object = object;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._object.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._object.errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._object.inputErrorClass);
        errorElement.classList.remove(this._object.errorClass);
        errorElement.textContent = '';
    };

    _checkInput(inputElement) {
        if (inputElement.validity.valid) {
            hideInputError(inputElement);
        } else {
            showInputError(inputElement, inputElement.validationMessage);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => !inputElement.validity.valid);
    };

    _enableSubmitBtn(btn) {
        btn.classList.remove(this._object.inactiveButtonClass);
    }

    _allInputsEmpty(inputList) {
        return !inputList.some(inputElement => inputElement.value.length > 0);
    };

    _disableSubmitBtn(btn) {
        btn.classList.add(this._object.inactiveButtonClass);
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList) || this._allInputsEmpty(inputList)) {
            this._disableSubmitBtn(buttonElement);
            buttonElement.setAttribute('disabled', true);
        } else {
            this._enableSubmitBtn(buttonElement);
=======
    constructor(object) {
        this._object = object;
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
    _disableSubmitBtn(btn, object) {
        btn.classList.add(object.inactiveButtonClass);
    };

    // Функция включения кнопки submit 
    _enableSubmitBtn(btn, object) {
        btn.classList.remove(object.inactiveButtonClass);
    };

    _checkInput(formElement, inputElement, object) {
        if (inputElement.validity.valid) {
            this.hideInputError(formElement, inputElement, object);
        } else {
            this.showInputError(formElement, inputElement, inputElement.validationMessage, object);
        }
    };

    // Навесим слушалки на все инпуты
    _setInputListeners(formElement, object) {
        const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
        const buttonElement = formElement.querySelector(object.submitButtonSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInput(formElement, inputElement, object);
                this.toggleButtonState(inputList, buttonElement, object);
            });
        });
        this.toggleButtonState(inputList, buttonElement, object);
    };

    // Ф-йия переключения состояния кнопки
    toggleButtonState(inputList, buttonElement, object) {
        if (this._hasInvalidInput(inputList, object) || this._allInputsEmpty(inputList, object)) {
            this._disableSubmitBtn(buttonElement, object);
            buttonElement.setAttribute('disabled', true);
        } else {
            this._enableSubmitBtn(buttonElement, object);
>>>>>>> refactoring/classes-creating
            buttonElement.removeAttribute('disabled');
        }
    };

<<<<<<< HEAD
    _setInputListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._object.inputSelector));
        const buttonElement = this._formElement.querySelector(this._object.submitButtonSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation() {
        this._setInputListeners();
    };
=======
    // Покажем ошибку
    showInputError(formElement, inputElement, errorMessage, object) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(object.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(object.errorClass);
    };

    // Спрячем ошибку
    hideInputError(formElement, inputElement, object) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(object.inputErrorClass);
        errorElement.classList.remove(object.errorClass);
        errorElement.textContent = '';
    };

    // Опишем функцию включения валидации
    enableValidation(object) {
        const formList = Array.from(document.querySelectorAll(object.formSelector));

        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setInputListeners(formElement, object);
        });
    };
>>>>>>> refactoring/classes-creating
}