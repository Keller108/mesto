// const validationObject = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// };


// Ф-ция, проверяющая все ли инпуты пустые
const allInputsEmpty = (inputList) => {
    return !inputList.some(inputElement => inputElement.value.length > 0);
};

// Проверка на невалидность хотя бы одного инпута 
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
};

// Ф-йия переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList) || allInputsEmpty(inputList)) {
        buttonElement.classList.add('form__submit-btn_disabled');
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('form__submit-btn_disabled');
        buttonElement.removeAttribute('disabled');
    }
};

// Покажем ошибку
const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('form__input-error_active');
};

// Спрячем ошибку
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
};

const checkInput = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement);
    } else {
        showInputError(formElement, inputElement);
    }
};

// Навесим слушалки на все инпуты
const setInputListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit-btn');

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInput(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
        allInputsEmpty(inputList, buttonElement);
    });
};

// Опишем функцию включения валидации
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));

    formList.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setInputListeners(formElement);
    });
}

// Вызовем функцию
enableValidation();