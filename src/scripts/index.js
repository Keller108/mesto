import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

// ЛАЙТБОКС

// Создание экземпляра класса лайтбокса
const popupLightbox = new PopupWithImage(lightBoxSelector);

// Коллбэк функция открытия лайтбокса
function handleCardClick(link, name) {
    popupLightbox.open(link, name)
}

// Создание экземпляра класса Section
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const newCard = new Card(item.link, item.name, handleCardClick);
        const cardElement = newCard.generateCard();
        cardList.addItem(cardElement);
    }
}, '.elements__cards');
cardList.renderItems();

/// РЕДАКТ. ПРОФИЛЯ

const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__description' });

const popupTypeEditProfile = new PopupWithForm(popupUserFormSelector, inputsValue => {
    userInfo.setUserInfo(inputsValue);
    popupTypeEditProfile.close();
})

popupEditOpenBtn.addEventListener('click', () => {
    popupTypeEditProfile.open()
    const userMetaData = userInfo.getUserInfo()
    fieldName.value = userMetaData.name;
    fieldDescr.value = userMetaData.job;
});

// ДОБАВЛЕНИЯ КАРТОЧКИ

// Коллбэк функция создания нового экземпляра попапа добавления карточки
function handleOpenPopupTypeAdd() {
    const popupTypeAddCard = new PopupWithForm(popupFormSelector, inputsValue => {
        const newCard = new Card(inputsValue.link, inputsValue.name, handleCardClick)
            .generateCard();
        cardList.addItem(newCard);
        popupTypeAddCard.close();
    });
    popupTypeAddCard.open()
}

// ВАЛИДАЦИЯ
const formValidation = new FormValidator(validationObject);
formValidation.enableValidation(validationObject);

// СЛУШАТЕЛИ

// Добавление слушателя кнопке "Добавить карточку"
popupAddOpenBtn.addEventListener('click', handleOpenPopupTypeAdd);

// Слушатель для открытия попапа Edit
// popupEditOpenBtn.addEventListener('click', handleOpenPopupTypeEdit);

// Вызов класса UserInfo
// const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__description' });

// Коллбэк функция создания нового экземпляра попапа редактирования профиля
// function handleOpenPopupTypeEdit() {
//     const popupTypeEditProfile = new PopupWithForm(popupUserFormSelector, items => {
//         userInfo.setUserInfo(items);
//         popupTypeEditProfile.close();
//     });
//     popupTypeEditProfile.open();
// }

// Слушатель для открытия попапа Edit
// popupEditOpenBtn.addEventListener('click', () => {
//     PopupWithForm.open();
// fieldName.value = profileName.textContent;
// fieldDescr.value = profileDescription.textContent;
// });

// Добавление данных из полей edit-profile в профиль
// profileFormEdit.addEventListener('submit', evt => {
//     evt.preventDefault();
//     profileName.textContent = fieldName.value;
//     profileDescription.textContent = fieldDescr.value;
//     closePopup(popupEdit);
// });

// Сабмит форм
// function handleFormSubmit(inputsValue) {
//     const newCard = new Card(inputsValue.link, inputsValue.name, openLightbox)
//         .generateCard();
//     cardList.addItem(newCard);
// }

// popupAddOpenBtn.addEventListener('click', () => {
//     openPopup(popupAdd);
// });

// Добавление карточки через форму
// profileFormAdd.addEventListener('submit', evt => {
//     evt.preventDefault();
//     cardsContainer.prepend(new Card(inputName.value, inputPictureLink.value).generateCard());
//     closePopup(popupAdd);
//     profileFormAdd.reset();
// });

// Добавления слушателя 
// popupLightbox.addEventListener('click', (evt) => {
//     popupLightbox.closeByClickOnOverlay()

// });

// lightBoxImg.src = this._link;
// lightBoxImg.alt = this._element.closest('.elements__card').querySelector('.elements__place-name').textContent;
// lightBoxTitle.textContent = this._element.closest('.elements__card').querySelector('.elements__place-name').textContent;

// popupLightbox.setEventListeners();

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

// popups.forEach((popup) => {

//     popup.addEventListener('click', (evt) => {
//         if (evt.target.classList.contains('popup_opened')) {
//             closePopup(popup)
//         };

//         if (evt.target.classList.contains('popup__close')) {
//             closePopup(popup)
//         };
//     });
// });

// Ф-ция закрытия попапа по нажатию ESC
// function closeByEscape(evt) {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened')
//         closePopup(openedPopup);
//     }
// };

// open(popupSelector) {
//     popupSelector.classList.add('popup_opened');
//     document.addEventListener('keydown', closeByEscape);
//     _disableBtnBeforePopup(addBtn);
// }

// close(popupSelector) {
//     popupSelector.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closeByEscape);
// }

// _handleEscClose(evt) {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened')
//         closePopup(openedPopup);
//     }
// }

// setEventListener() {
//     const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

//     popupCloseButtons.forEach(function(item) {
//         btn.addEventListener('click', evt => {
//             const popupToClose = evt.target.closest('.popup_opened');
//             closePopup(popupToClose);
//         });
//     });
// }

// _disableBtnBeforePopup(btn) {
//     btn.classList.add(validationObject.inactiveButtonClass);
//     btn.setAttribute('disabled', 'disabled');
// }