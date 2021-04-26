import '/src/pages/index.css';
import { formCard, formProfile, containerSelector, initialCards, validationObject, fieldName, fieldDescr, popupEditOpenBtn, popupAddOpenBtn, lightBoxSelector, popupUserFormSelector, popupFormSelector, submitBtn } from '../scripts/utils/utilities.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const validFormEdit = new FormValidator(validationObject, formProfile);
const validFormAdd = new FormValidator(validationObject, formCard);

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
}, containerSelector);
cardList.renderItems();

/// РЕДАКТ. ПРОФИЛЯ

const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__description' });

const popupTypeEditProfile = new PopupWithForm(popupUserFormSelector, inputsValue => {
    userInfo.setUserInfo(inputsValue);
})

// ДОБАВЛЕНИЯ КАРТОЧКИ

const popupTypeAddCard = new PopupWithForm(popupFormSelector, inputsValue => {
    const newCard = new Card(inputsValue.link, inputsValue.name, handleCardClick)
        .generateCard();
    cardList.addItem(newCard);
});

// Функция отключения кнопки Submit

function disableButton() {
    submitBtn.forEach((button) => {
        button.classList.add(validationObject.inactiveButtonClass);
        button.setAttribute('disabled', 'disabled')
    });
}

// ВАЛИДАЦИЯ

const formValidation = new FormValidator(validationObject);
validFormEdit.enableValidation(validationObject);
validFormAdd.enableValidation(validationObject);

// СЛУШАТЕЛИ

// Добавление слушателя кнопке "Добавить карточку"
popupAddOpenBtn.addEventListener('click', () => {
    popupTypeAddCard.open()
    disableButton();
    validFormAdd.removeErrors();
});

// Добавление слушателя кнопке "Редактировать профиль"
popupEditOpenBtn.addEventListener('click', () => {
    popupTypeEditProfile.open()
    const userMetaData = userInfo.getUserInfo()
    fieldName.value = userMetaData.name;
    fieldDescr.value = userMetaData.job;
    disableButton();
    validFormEdit.removeErrors();
});

popupLightbox.setEventListeners();
popupTypeEditProfile.setEventListeners();
popupTypeAddCard.setEventListeners();