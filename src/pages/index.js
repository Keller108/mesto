import '/src/pages/index.css';
import Api from '../scripts/components/Api.js';
import { popupEdit, popupAdd, lightbox, lightboxImage, lightboxCaption, popupConfirmSelector, cardSelector, cardsContainer, formCard, formProfile, containerSelector, initialCards, validationObject, fieldName, fieldDescr, popupEditOpenBtn, userDataElements, popupAddOpenBtn, lightBoxSelector, popupUserFormSelector, popupFormSelector, submitBtn } from '../scripts/utils/utilities.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupConfirm from '../scripts/components/PopupConfirm.js';


const popupConfirm = new PopupConfirm(popupConfirmSelector);
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
                    myId,
                    ...element
                },
                () => {
                    popupLightbox.open(element)
                },
                function deleteCard(cardId) {
                    popupConfirm.open();
                    popupConfirm.setSubmitAction(() => {
                        api.deleteCard(cardId)
                            .then(() => popupConfirm.close())
                            .then(() => card.remove())
                            .catch(err => console.log(err))
                    })
                },
                function putLike(cardId) {
                    api.putLike(cardId)
                        .then((res) => {
                            card.querySelector('.elements__likes-counter').textContent = res.likes.length;
                            card.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_is_active');
                        })
                        .catch(err => console.log(err))
                },
                function removeLike(cardId) {
                    api.removeLike(cardId)
                        .then((res) => {
                            card.querySelector('.elements__likes-counter').textContent = res.likes.length;
                            card.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_is_active');
                        })
                        .catch(err => console.log(err))
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


        // ОБНОВЛЕНИЕ ПРОФИЛЯ //

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


        // ДОБАВЛЕНИЕ КАРТОЧКИ //

        // Добавление слушателя кнопке "Добавить карточку"
        popupAddOpenBtn.addEventListener('click', () => {
            popupTypeAddCard.open()
            disableButton();
            validFormAdd.removeErrors();
        });

        const popupTypeAddCard = new PopupWithForm(popupFormSelector, inputsValue => {
            const buttonText = popupAdd.querySelector('.form__submit-btn');
            buttonText.textContent = 'Создание...';

            api.uploadCard(inputsValue)
                .then((data) => {
                    buttonText.textContent = 'Создать';
                    const cardElement = createCard(data);
                    cardList.addItem(cardElement);
                })
                .catch(err => console.log(err))

        });

        // ВАЛИДАЦИЯ

        const formValidation = new FormValidator(validationObject);
        validFormEdit.enableValidation(validationObject);
        validFormAdd.enableValidation(validationObject);


        // СЛУШАТЕЛИ



        // Функция отключения кнопки Submit
        function disableButton() {
            submitBtn.forEach((button) => {
                button.classList.add(validationObject.inactiveButtonClass);
                button.setAttribute('disabled', 'disabled')
            });
        }
        // popupConfirm.setEventListeners();
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