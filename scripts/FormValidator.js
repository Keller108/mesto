export default class FormValidator {
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
            buttonElement.removeAttribute('disabled');
        }
    };

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
}