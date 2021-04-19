import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const newCard = new Card(item.name, item.link);
        const cardElement = newCard.generateCard();
        cardList.addItem(cardElement);
    }
}, '.elements__cards');

cardList.renderItems();

const popupLightbox = new PopupWithImage(lightBoxSelector);
const popupForm = new Popup()

popupLightbox.setEventListener();



// initialCards.forEach((item) => {
//     cardsContainer.prepend(new Card(item.name, item.link, openPopup).generateCard());
// });

// Открытие попапов
// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closeByEscape);
//     disableBtnBeforePopup(addBtn);
// }

//Дизейбл кнопки при отрытии формы "Добавить карточку"
// function disableBtnBeforePopup(btn) {
//     btn.classList.add(validationObject.inactiveButtonClass);
//     btn.setAttribute('disabled', 'disabled');
// }

// Закрытие попапов
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closeByEscape);
// }

// Выбираю все кноки "закрыть попап"
// const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

// popupCloseButtons.forEach(function(item) {
//     item.addEventListener('click', evt => {
//         const popupToClose = evt.target.closest('.popup_opened');
//         closePopup(popupToClose);
//     });
// });

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

// Ф-ция закрытия попапа по нажатию ESC
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
};

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

// Добавление карточки через форму
profileFormAdd.addEventListener('submit', evt => {
    evt.preventDefault();
    cardsContainer.prepend(new Card(inputName.value, inputPictureLink.value, openPopup).generateCard());
    closePopup(popupAdd);
    profileFormAdd.reset();
});

// Запуск валидации
const formValidation = new FormValidator(validationObject);
formValidation.enableValidation(validationObject);