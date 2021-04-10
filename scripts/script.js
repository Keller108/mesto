<<<<<<< HEAD
import Card from './Card.js'
import FormValidator from './FormValidator.js'

// Валидация по формам
const formList = Array.from(forms);
formList.forEach((formElement) => {
    new FormValidator(formElement).enableValidation();
});

// Карточки "из коробки"
initialCards.forEach(item => {
    cardsContainer.prepend(new Card(cardsTemplate, item).getCard());
=======
import Card from './Card.js';
import FormValidator from './FormValidator.js';

initialCards.forEach((item) => {
    cardsContainer.prepend(new Card(item.name, item.link, openPopup).generateCard());
>>>>>>> refactoring/classes-creating
});

// Открытие попапов
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
    addBtn.classList.add(validationObject.inactiveButtonClass);
    addBtn.setAttribute('disabled', 'disabled');
}

// Закрытие попапов
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

<<<<<<< HEAD
// Закрытие попапов по нажатию ESC
export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
};

// Закрытие попапов по клику на оверлей
=======
// Выбираю все кноки "закрыть попап"
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

popupCloseButtons.forEach(function(item) {
    item.addEventListener('click', evt => {
        const popupToClose = evt.target.closest('.popup_opened');
        closePopup(popupToClose);
    });
});

>>>>>>> refactoring/classes-creating
popups.forEach((popup) => {

    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        };

        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        };
    });
});

popupCloseButtons.forEach(function(item) {
    item.addEventListener('click', evt => {
        const popupToClose = evt.target.closest('.popup_opened');
        closePopup(popupToClose);
    });
});

// Слушатель для открытия попапа Edit
popupEditOpenBtn.addEventListener('click', () => {
    openPopup(popupEdit);
    fieldName.value = profileName.textContent;
    fieldDescr.value = profileDescription.textContent;
});

// Добавление данных из полей edit-profile в профиль
profileFormEdit.addEventListener('submit', evt => {
    evt.preventDefault();
    profileName.textContent = fieldName.value;
    profileDescription.textContent = fieldDescr.value;
    closePopup(popupEdit);
});

popupAddOpenBtn.addEventListener('click', () => {
    openPopup(popupAdd);
});

<<<<<<< HEAD
=======
// Добавление карточки через форму
>>>>>>> refactoring/classes-creating
profileFormAdd.addEventListener('submit', evt => {
    evt.preventDefault();
    cardsContainer.prepend(new Card(inputName.value, inputPictureLink.value).generateCard());
    closePopup(popupAdd);
    profileFormAdd.reset();
});

<<<<<<< HEAD
renderClassList();
=======
// Запуск валидации
const formValidation = new FormValidator(validationObject);
formValidation.enableValidation(validationObject);
>>>>>>> refactoring/classes-creating
