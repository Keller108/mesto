import Card from './Card.js';
// import FormValidator from './FormValidator.js/index.js';

initialCards.forEach((item) => {
    cardsContainer.prepend(new Card(item.name, item.link).generateCard());
});

// // Открытие попапов
// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closeByEscape);
// }

// // Закрытие попапов
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closeByEscape);
// }

// // Выбираю все кноки "закрыть попап"
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

// // Ф-ция закрытия попапа по нажатию ESC
// function closeByEscape(evt) {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened')
//         closePopup(openedPopup);
//     }
// };

// // Слушатель для открытия попапа Edit
// popupEditOpenBtn.addEventListener('click', () => {
//     openPopup(popupEdit);
//     fieldName.value = profileName.textContent;
//     fieldDescr.value = profileDescription.textContent;
// });

// // Добавление данных из полей edit-profile в профиль
// profileFormEdit.addEventListener('submit', evt => {
//     evt.preventDefault();
//     profileName.textContent = fieldName.value;
//     profileDescription.textContent = fieldDescr.value;
//     closePopup(popupEdit);
// });

// popupAddOpenBtn.addEventListener('click', () => {
//     openPopup(popupAdd);
// });

// // Функция создания нового DOM узла
// function createCardDomNode(card) {

//     const newItem = templateCard.content.querySelector('.elements__card').cloneNode(true);
//     const domCardImg = newItem.querySelector('.elements__place-name');

//     domCardImg.textContent = card.name;
//     domCardImg.alt = card.name;
//     newItem.querySelector('.elements__card-image').src = card.link;

//     handleAddCardSubmit(newItem);
//     return newItem;

// };

// // Функция рендера карточек на странице
// function renderClassList() {
//     const result = initialCards.map(function(item) {
//         const newCard = createCardDomNode(item);
//         return newCard;
//     });

//     //Отрисуем
//     cardsContainer.prepend(...result);
// };

// profileFormAdd.addEventListener('submit', evt => {
//     evt.preventDefault();
//     const cardName = inputName.value;
//     const cardImage = inputPictureLink.value;
//     const addNewCard = createCardDomNode({ name: cardName, link: cardImage });
//     cardsContainer.prepend(addNewCard);
//     closePopup(popupAdd);
//     profileFormAdd.reset();
// });

// function deleteCardHandler(evt) {
//     const currentCard = evt.target.closest('.elements__card');
//     currentCard.remove();
// };

// function likeCardHandler(evt) {
//     evt.target.classList.toggle('elements__like-btn_is_active');
// };

// function handleAddCardSubmit(cards) {
//     const deleteBtn = cards.querySelector('.elements__delete-btn');
//     deleteBtn.addEventListener('click', deleteCardHandler);

//     const likeBtn = cards.querySelector('.elements__like-btn');
//     likeBtn.addEventListener('click', likeCardHandler);

//     const openLightBoxBtn = cards.querySelector('.elements__card-image');
//     openLightBoxBtn.addEventListener('click', function(evt) {
//         openPopup(lightBox);
//         const target = evt.target;
//         lightBoxImg.src = target.src;
//         lightBoxImg.alt = target.closest('.elements__card').querySelector('.elements__place-name').textContent;
//         lightBoxTitle.textContent = target.closest('.elements__card').querySelector('.elements__place-name').textContent;
//     });
// };

// renderClassList();