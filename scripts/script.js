// Массив для карточек
const initialCards = [{
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ],
    popupEdit = document.querySelector('.popup-edit'),
    popupAdd = document.querySelector('.popup-add'),
    popupEditOpenBtn = document.querySelector('.profile__edit-button'),
    popupEditCloseBtn = document.querySelector('.popup-edit__close-btn'),
    popupAddOpenBtn = document.querySelector('.profile__add-button'),
    popupAddCloseBtn = document.querySelector('.popup-add__close-btn'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description'),
    fieldName = document.querySelector('.form__input_el_name'),
    fieldDescr = document.querySelector('.form__input_el_descr'),
    submitEditForm = document.querySelector('.edit-form'),
    submitAddForm = document.querySelector('.add-form'),
    templateCard = document.querySelector('.template'),
    cardsContainer = document.querySelector('.elements__cards');


// Функция создания нового DOM узла
function createCardDomNode(card) {
    const newItem = templateCard.content.cloneNode(true);
    // const place = newItem.querySelector('.elements__place-name');
    // const placeImage = newItem.querySelector('.elements__card-image');

    newItem.querySelector('.elements__place-name').textContent = card.name;
    newItem.querySelector('.elements__card-image').src = card.link;
    newItem.querySelector('.elements__card-image').alt = card.name;

    return newItem;
};

// Функция рендера карточек на странице
function renderClassList() {
    result = initialCards.map(function(item) {
        const newCard = createCardDomNode(item);
        addCardsListeners(newCard);
        return newCard;
    });

    //Отрисуем
    cardsContainer.prepend(...result);
};

function addCardFormListeners(evt) {
    evt.preventDefault();
    const inputName = document.querySelector('.form__input_el_place'),
        inputPictureLink = document.querySelector('.form__input_el_pic-link');

    const cardName = inputName.value;
    const cardImage = inputPictureLink.value;

    const addNewCard = createCardDomNode({ name: cardName, link: cardImage });

    addCardsListeners(addNewCard);

    cardsContainer.prepend(addNewCard);
}

function deleteCardHandler(evt) {
    const target = evt.target;
    const currentCard = target.closest('.elements__card');
    currentCard.remove();
}

function likeCardHandler(evt) {
    const target = evt.target;
    const likedCard = target.querySelector('.elements__like-btn');

    target.classList.add('elements__like-btn_is_active');
}

renderClassList(initialCards);

function addCardsListeners(cards) {
    const deleteBtn = cards.querySelector('.elements__delete-btn');
    deleteBtn.addEventListener('click', deleteCardHandler);

    const likeBtn = cards.querySelector('.elements__like-btn');
    likeBtn.addEventListener('click', likeCardHandler);
}

// Функция открытия попапа Edit
function openEditPopup() {
    popupEdit.classList.add('popup-edit_opened');
    fieldName.value = profileName.textContent;
    fieldDescr.value = profileDescription.textContent;
};


// Функция открытия попапа Add
function openAddPopup() {
    popupAdd.classList.add('popup-add_opened');
};


// Функция добавления данных из полей edit-profile в профиль
function formSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = fieldName.value;
    profileDescription.textContent = fieldDescr.value;
    closePopup();
};

// Функция закрытия попапов
function closePopup() {
    //Закрываем popupEdit
    popupEdit.classList.remove('popup-edit_opened');

    //Закрываем popupAdd
    popupAdd.classList.remove('popup-add_opened');
};

popupEditOpenBtn.addEventListener('click', openEditPopup);
popupAddOpenBtn.addEventListener('click', openAddPopup);

submitEditForm.addEventListener('submit', formSubmit);
submitAddForm.addEventListener('submit', addCardFormListeners);


popupEditCloseBtn.addEventListener('click', closePopup);
popupAddCloseBtn.addEventListener('click', closePopup);