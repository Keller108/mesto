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
    cardsContainer = document.querySelector('.elements__cards');


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


// Функция создания нового DOM узла
function createCardDomNode(item) {

    //Выбираем фрагмент и его содержимое карточку
    const templateCard = document.querySelector('.template'),
        newItem = templateCard.content.querySelector('.elememts__card').cloneNode(true),

        cardImage = newCard.querySelector('.elements__card-image'),
        cardPlace = newCard.querySelector('elements__place-name');

    cardImage.src = link.value;
    cardPlace.textContent = item.name;

    return newCard;
}


// Функция рендера карточек на странице
function renderList() {
    const result = initialCards.map(function(item) {
        const newCard = createCardDomNode(item);

        return newCard;
    })

    cardsContainer.append(...result);
};

renderList();

popupEditOpenBtn.addEventListener('click', openEditPopup);
popupAddOpenBtn.addEventListener('click', openAddPopup);

submitFormEdit.addEventListener('submit', formSubmit);

popupEditCloseBtn.addEventListener('click', closePopup);
popupAddCloseBtn.addEventListener('click', closePopup);