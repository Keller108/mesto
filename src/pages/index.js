import '/src/pages/index.css';
import Api from '../scripts/components/Api.js';
import { popupEdit, popupAdd, btnEditAvatar, popupEditAvatar, popupEditAvatarSelector, lightboxImage, lightboxCaption, popupConfirmSelector, cardSelector, cardsContainer, formCard, formUpdateAvatar, formProfile, validationObject, fieldName, fieldDescr, popupEditOpenBtn, userDataElements, popupAddOpenBtn, lightBoxSelector, popupUserFormSelector, popupFormSelector, submitBtn } from '../scripts/utils/utilities.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';


const popupConfirm = new PopupWithForm(popupConfirmSelector);
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
        userDataElements.avatar.setAttribute('style', `background-image: url("${avatar}")`)

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
                cardId => {
                    popupConfirm.open()
                    api.removeCard(cardId)
                        .then(() => popupConfirm.close())
                        .then(() => card.remove())
                        .catch(err => console.log(err))

                },
                // Коллбек лайка карточки
                cardId => {
                    api.putLike(cardId)
                        .then((res) => {
                            card.querySelector('.elements__likes-counter').textContent = res.likes.length;
                            card.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_is_active');
                        })
                        .catch(err => console.log(err))
                },
                // Коллбек удаления лайка
                cardId => {
                    api.removeLike(cardId)
                        .then((res) => {
                            card.querySelector('.elements__likes-counter').textContent = res.likes.length;
                            card.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_is_active');
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
            const buttonText = popupEdit.querySelector('.form__submit-btn')
            buttonText.textContent = 'Сохранение...'

            api.sendInfo(inputsValue)
                .then(data => {
                    buttonText.textContent = 'Сохранить'
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
            disableButton();
            validFormEdit.removeErrors();
        });

        // Редактирование аватара
        const popupTypeSetAvatar = new PopupWithForm(popupEditAvatarSelector, inputsValue => {
            const buttonText = popupEditAvatar.querySelector('.form__submit-btn')
            buttonText.textContent = 'Сохранение...'

            api.updateAvatar(inputsValue)
                .then(data => {
                    buttonText.textContent = 'Сохранить'
                    userDataElements.avatar.setAttribute('style', `background-image: url("${data.avatar}")`)
                    popupTypeSetAvatar.close()
                })
                .catch(err => console.log(err))
        })
        btnEditAvatar.addEventListener('click', () => {
            popupTypeSetAvatar.open();
            disableButton();
            validFormUpdateAvatar.removeErrors();
        })

        // Добавить карточку
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

        // Функция отключения кнопки Submit
        function disableButton() {
            submitBtn.forEach((button) => {
                button.classList.add(validationObject.inactiveButtonClass);
                button.setAttribute('disabled', 'disabled')
            });
        }

        // ВАЛИДАЦИЯ

        validFormEdit.enableValidation(validationObject);
        validFormAdd.enableValidation(validationObject);
        validFormUpdateAvatar.enableValidation(validationObject);


        // СЛУШАТЕЛИ

        popupConfirm.setEventListeners();
        popupTypeSetAvatar.setEventListeners();
        popupLightbox.setEventListeners();
        popupTypeEditProfile.setEventListeners();
        popupTypeAddCard.setEventListeners();
    })