const validationObject = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};


// Ф-ция, проверяющая все ли инпуты пустые
const allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
};

// Проверка на невалидность хотя бы одного инпута 
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

// Ф-йия переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, object) => {
    if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
        buttonElement.classList.add(object.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(object.submitButtonSelector);
        buttonElement.removeAttribute('disabled');
    }
};

// Покажем ошибку
const showInputError = (formElement, inputElement, errorMessage, object) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(object.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.errorClass);
};

// Спрячем ошибку
const hideInputError = (formElement, inputElement, object) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.remove(object.errorClass);
    errorElement.textContent = '';
};

const checkInput = (formElement, inputElement, object) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, object);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, object);
    }
};

// Навесим слушалки на все инпуты
const setInputListeners = (formElement, object) => {
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
const enableValidation = (object) => {
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