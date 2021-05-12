import '/src/pages/index.css';
import Api from '../scripts/components/Api.js';
import { btnEditAvatar, popupEditAvatarSelector, lightboxImage, lightboxCaption, popupConfirmSelector, cardSelector, cardsContainer, formCard, formUpdateAvatar, formProfile, validationObject, fieldName, fieldDescr, popupEditOpenBtn, userDataElements, popupAddOpenBtn, lightBoxSelector, popupUserFormSelector, popupFormSelector, submitBtns, buttonEdit, buttonAdd, buttonEditAvatar } from '../scripts/utils/utilities.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupConfirm from '../scripts/components/PopupConfirm';
import UserInfo from '../scripts/components/UserInfo.js';

const popupConfirm = new PopupConfirm(popupConfirmSelector);
popupConfirm.setEventListeners();
const cardList = new Section(cardsContainer);
const validFormEdit = new FormValidator(validationObject, formProfile);
const validFormAdd = new FormValidator(validationObject, formCard);
const validFormUpdateAvatar = new FormValidator(validationObject, formUpdateAvatar);
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
        userInfo.setAvatar(avatar)

        // Функция создания карточки
        const createCard = (element) => {
            const card = new Card(
                cardSelector, {
                    myId,
                    ...element
                },
                // Коллбек открытия попапа с картинкой
                () => {
                    popupLightbox.open(element)
                },
                // Коллбек удаления карточки
                function removeCard(cardId) {
                    const buttonText = document.querySelector('.submit-btn')
                    buttonText.textContent = 'Удалить'
                    popupConfirm.open()
                    popupConfirm.setSubmitAction(() => {
                        api.removeCard(cardId)
                            .then(() => {
                                buttonText.textContent = 'Удаление...'
                                popupConfirm.close()
                            })
                            .then(() => card.remove())
                            .catch(err => console.log(err))
                    })
                },
                // Коллбек лайка карточки
                cardId => {
                    api.putLike(cardId)
                        .then((res) => {
                            card.updateLikes(res.likes.length)
                        })
                        .catch(err => console.log(err))
                },
                // Коллбек удаления лайка
                cardId => {
                    api.removeLike(cardId)
                        .then((res) => {
                            card.updateLikes(res.likes.length)
                        })
                        .catch(err => console.log(err))
                }
            ).generateCard()
            return card;
        }

        // Рендерим карточки с сервера
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
            buttonEdit.textContent = 'Сохранение...'

            api.sendInfo(inputsValue)
                .then(data => {
                    buttonEdit.textContent = 'Сохранить'
                    userInfo.setUserInfo(data)
                    popupTypeEditProfile.close()
                })
                .catch(err => console.log(err))
        })

        // Слушатель на кнопку редактирования профиля
        popupEditOpenBtn.addEventListener('click', () => {
            popupTypeEditProfile.open()
            const { name, about } = userInfo.getUserInfo()
            fieldName.value = name;
            fieldDescr.value = about;
            validFormEdit.disableSubmitBtn(buttonEdit)
            validFormEdit.removeErrors();
        });

        // Редактирование аватара
        const popupTypeSetAvatar = new PopupWithForm(popupEditAvatarSelector, inputsValue => {
            buttonEditAvatar.textContent = 'Сохранение...'

            api.updateAvatar(inputsValue)
                .then(data => {
                    buttonEditAvatar.textContent = 'Сохранить'
                    userInfo.setAvatar(data.avatar)
                    popupTypeSetAvatar.close()
                })
                .catch(err => console.log(err))
        })
        btnEditAvatar.addEventListener('click', () => {
            popupTypeSetAvatar.open();
            validFormUpdateAvatar.disableSubmitBtn(buttonEditAvatar);
            validFormUpdateAvatar.removeErrors();
        })

        // Добавить карточку
        popupAddOpenBtn.addEventListener('click', (element) => {
            popupTypeAddCard.open();
            validFormAdd.disableSubmitBtn(buttonAdd)
            validFormAdd.removeErrors();
        });

        const popupTypeAddCard = new PopupWithForm(popupFormSelector, inputsValue => {
            buttonAdd.textContent = 'Создание...';

            api.uploadCard(inputsValue)
                .then((data) => {
                    buttonAdd.textContent = 'Создать';
                    const cardElement = createCard(data);
                    cardList.addItem(cardElement);
                })
                .catch(err => console.log(err))

        });

        // ВАЛИДАЦИЯ

        validFormEdit.enableValidation();
        validFormAdd.enableValidation();
        validFormUpdateAvatar.enableValidation();


        // СЛУШАТЕЛИ

        popupTypeSetAvatar.setEventListeners();
        popupLightbox.setEventListeners();
        popupTypeEditProfile.setEventListeners();
        popupTypeAddCard.setEventListeners();
    })