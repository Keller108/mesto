import { initialCards, validationObject, fieldName, fieldDescr, popupEditOpenBtn, popupAddOpenBtn, lightBoxSelector, popupUserFormSelector, popupFormSelector } from '../scripts/utils/utilities.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

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