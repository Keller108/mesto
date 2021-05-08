import '/src/pages/index.css';
import Api from '../scripts/components/Api.js';
import { popupEdit, lightbox, lightboxImage, lightboxCaption, cardSelector, cardsContainer, formCard, formProfile, containerSelector, initialCards, validationObject, fieldName, fieldDescr, popupEditOpenBtn, userDataElements, popupAddOpenBtn, lightBoxSelector, popupUserFormSelector, popupFormSelector, submitBtn } from '../scripts/utils/utilities.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const cardList = new Section(cardsContainer);
const validFormEdit = new FormValidator(validationObject, formProfile);
const validFormAdd = new FormValidator(validationObject, formCard);
const userInfo = new UserInfo(userDataElements);
const popupLightbox = new PopupWithImage(lightBoxSelector, lightboxImage, lightboxCaption);

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
        Authorization: 'd5de609a-b67a-44fe-8387-d8a318d2487b',
        'Content-Type': 'application/json'
    }
})

// Апдейтим профиль юзера на странице
api.getInfo()
    .then(({ name, about, avatar, _id }) => {
        const myId = _id
        userInfo.setUserInfo({ name, about })
        userDataElements.avatar.setAttribute('style', `background-image: url("${avatar}")`);

        const createCard = (element) => {
            const card = new Card(
                cardSelector, {
                    ...element
                },
                () => {
                    popupLightbox.open(element)
                }
            )
            return card.generateCard();
        }

        api.getAllCards()
            .then((data) => {
                cardList.renderItems({
                    items: data.reverse(),
                    renderer: (item) => {
                        const card = createCard(item)
                        cardList.addItem(card);
                    }
                })
            })

        const popupTypeEditProfile = new PopupWithForm(popupUserFormSelector, inputsValue => {
            const buttonText = popupEdit.querySelector('.form__submit-btn')
            buttonText.textContent = 'Сохранение...'

            api.sendInfo(inputsValue)
                .then(data => {
                    buttonText.textContent = 'Сохранить'
                    userInfo.setUserInfo(data)
                    popupTypeEditProfile.close()
                    console.log(data)
                })
                .catch(err => console.log(err))
        })

        popupEditOpenBtn.addEventListener('click', () => {
            popupTypeEditProfile.open()
            const { name, about } = userInfo.getUserInfo()
            fieldName.value = name;
            fieldDescr.value = about;
            disableButton();
            validFormEdit.removeErrors();
        });

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

        const popupTypeAddCard = new PopupWithForm(popupFormSelector, inputsValue => {
            const cardElement = createCard(inputsValue.link, inputsValue.name)
            cardList.addItem(cardElement);
        });

        // Функция отключения кнопки Submit
        function disableButton() {
            submitBtn.forEach((button) => {
                button.classList.add(validationObject.inactiveButtonClass);
                button.setAttribute('disabled', 'disabled')
            });
        }

        popupLightbox.setEventListeners();
        popupTypeEditProfile.setEventListeners();
        popupTypeAddCard.setEventListeners();
    })

// Рендерим карточки с сервера на странице
// api.getAllCards()
//     .then((data) => {
//         cardList.renderItems({
//             items: data.reverse(),
//             renderer: (item) => {
//                 const card = createCard(item)
//                 cardList.addItem(card);
//             }
//         })
//     })

/// РЕДАКТ. ПРОФИЛЯ

// const popupTypeEditProfile = new PopupWithForm(popupUserFormSelector, inputsValue => {
//     const buttonText = popupEdit.querySelector('.form__submit-btn')
//     buttonText.textContent = 'Сохранение...'

//     api.sendInfo(inputsValue)
//         .then(data => {
//             buttonText.textContent = 'Сохранить'
//             userInfo.setUserInfo(data)
//             popupTypeEditProfile.close()
//             console.log(data)
//         })
//         .catch(err => console.log(err))
// })

// ДОБАВЛЕНИЯ КАРТОЧКИ

// const popupTypeAddCard = new PopupWithForm(popupFormSelector, inputsValue => {
//     const cardElement = createCard(inputsValue.link, inputsValue.name)
//     cardList.addItem(cardElement);
// });

// // Функция отключения кнопки Submit
// function disableButton() {
//     submitBtn.forEach((button) => {
//         button.classList.add(validationObject.inactiveButtonClass);
//         button.setAttribute('disabled', 'disabled')
//     });
// }

// // ВАЛИДАЦИЯ

// const formValidation = new FormValidator(validationObject);
// validFormEdit.enableValidation(validationObject);
// validFormAdd.enableValidation(validationObject);

// // СЛУШАТЕЛИ

// // Добавление слушателя кнопке "Добавить карточку"
// popupAddOpenBtn.addEventListener('click', () => {
//     popupTypeAddCard.open()
//     disableButton();
//     validFormAdd.removeErrors();
// });


// Добавление слушателя кнопке "Редактировать профиль"
// popupEditOpenBtn.addEventListener('click', () => {
//     popupTypeEditProfile.open()
//     const { name, about } = userInfo.getUserInfo()
//     fieldName.value = name;
//     fieldDescr.value = about;
//     disableButton();
//     validFormEdit.removeErrors();
// });

// popupLightbox.setEventListeners();
// popupTypeEditProfile.setEventListeners();
// popupTypeAddCard.setEventListeners();