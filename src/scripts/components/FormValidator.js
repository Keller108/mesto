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
    _disableSubmitBtn(btn) {
        btn.classList.add(this._object.inactiveButtonClass);
    };

    // Функция включения кнопки submit 
    _enableSubmitBtn(btn) {
        btn.classList.remove(this._object.inactiveButtonClass);
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
            this._disableSubmitBtn(buttonElement);
            buttonElement.setAttribute('disabled', true);
        } else {
            this._enableSubmitBtn(buttonElement);
            buttonElement.removeAttribute('disabled');
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
        const formList = Array.from(document.querySelectorAll(this._object.formSelector));

        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setInputListeners(formElement);
        });
    };

    // Удаление ошибок
    removeErrors() {
        const inputList = Array.from(document.querySelectorAll(this._object.inputSelector));
        inputList.forEach((inputElement) => {
            inputElement.classList.remove('form__input_type_error');
        });

        const errorList = Array.from(document.querySelectorAll('.input-error'));
        errorList.forEach((errorElement) => {
            errorElement.classList.remove('form__input-error_active');
            errorElement.textContent = '';
        });
    }
}