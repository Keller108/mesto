import Card from './Card.js'
import FormValidator from './FormValidator.js'

// Валидация по формам
const formList = Array.from(document.querySelectorAll(object.formSelector));
formList.forEach((formElement) => {
    new FormValidator(selectorsObject, formElement).enavleValidation();
});

// Карточки "из коробки"
initialCards.forEach(item => {
    cardsContainer.prepend(new Card(cardsTemplate, item).getCard());
});

// Открытие попапов
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

// Закрытие попапов
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

// Закрытие попапов по нажатию ESC
export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
};

// Закрытие попапов по клику на оверлей
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

profileFormAdd.addEventListener('submit', evt => {
    evt.preventDefault();
    const cardName = inputName.value;
    const cardImage = inputPictureLink.value;
    const addNewCard = createCardDomNode({ name: cardName, link: cardImage });
    cardsContainer.prepend(addNewCard);
    closePopup(popupAdd);
    profileFormAdd.reset();
});

renderClassList();