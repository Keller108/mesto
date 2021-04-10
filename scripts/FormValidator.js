export default class FormValidator {
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

    // Ф-йия переключения состояния кнопки
    _toggleButtonState(inputList, buttonElement, object) {
        if (hasInvalidInput(inputList, object) || allInputsEmpty(inputList, object)) {
            disableSubmitBtn(buttonElement, object);
            buttonElement.setAttribute('disabled', true);
        } else {
            enableSubmitBtn(buttonElement, object);
            buttonElement.removeAttribute('disabled');
        }
    };

    // Покажем ошибку
    _showInputError(formElement, inputElement, errorMessage, object) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(object.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(object.errorClass);
    };

    // Спрячем ошибку
    _hideInputError(formElement, inputElement, object) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(object.inputErrorClass);
        errorElement.classList.remove(object.errorClass);
        errorElement.textContent = '';
    };

    _checkInput(formElement, inputElement, object) {
        if (inputElement.validity.valid) {
            hideInputError(formElement, inputElement, object);
        } else {
            showInputError(formElement, inputElement, inputElement.validationMessage, object);
        }
    };

    // Навесим слушалки на все инпуты
    _setInputListeners(formElement, object) {
        const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
        const buttonElement = formElement.querySelector(object.submitButtonSelector);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                checkInput(formElement, inputElement, object);
                toggleButtonState(inputList, buttonElement, object);
            });
        });
        toggleButtonState(inputList, buttonElement, object);
    };

    // Опишем функцию включения валидации
    _enableValidation(object) {
        const formList = Array.from(document.querySelectorAll(object.formSelector));

        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            setInputListeners(formElement, object);
        });
    };

    // Вызовем функцию
    enableValidation(validationObject);