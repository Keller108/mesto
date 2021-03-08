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
    submitFormEdit = document.querySelector('.edit-form'),
    submitFormAdd = document.querySelector('.add-form'),
    templateCard = document.querySelector('.template'),
    cardsContainer = document.querySelector('.elements__cards');


// Функция создания нового DOM узла и рендер на странице
function renderClassList(list) {

    const cardsContainer = document.querySelector('.elements__cards'),
        newItem = document.querySelector('.template').content.querySelector('.elements__card');

    cards = list.map(function(item) {
        const card = newItem.cloneNode(true);
        addCardsListeners(card);
        card.querySelector('.elements__place-name').textContent = item.name;
        card.querySelector('.elements__card-image').src = item.link;
        card.querySelector('.elements__card-image').alt = item.name;
        return card;
    });

    //Отрисуем
    cardsContainer.prepend(...cards);
};

function deleteCardHandler(evt) {
    const target = evt.target;
    const currentCard = target.closest('.elements__card');
    currentCard.remove();
}

renderClassList(initialCards);

function addCardsListeners(cards) {
    const deleteBtn = cards.querySelector('.elements__delete-btn');
    deleteBtn.addEventListener('click', deleteCardHandler);
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

submitFormEdit.addEventListener('submit', formSubmit);

popupEditCloseBtn.addEventListener('click', closePopup);
popupAddCloseBtn.addEventListener('click', closePopup);