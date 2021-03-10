const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const inputName = document.querySelector('.form__input_el_place');
const inputPictureLink = document.querySelector('.form__input_el_pic-link');
const popupEditOpenBtn = document.querySelector('.profile__edit-button');
const popupEditCloseBtn = document.querySelector('.popup-edit__close-btn');
const popupAddOpenBtn = document.querySelector('.profile__add-button');
const popupAddCloseBtn = document.querySelector('.popup-add__close-btn');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const fieldName = document.querySelector('.form__input_el_name');
const fieldDescr = document.querySelector('.form__input_el_descr');
const submitEditForm = document.querySelector('.edit-form');
const submitAddForm = document.querySelector('.add-form');
const templateCard = document.querySelector('.template');
const cardsContainer = document.querySelector('.elements__cards');
const lightBoxCloseBtn = document.querySelector('.lightbox__close-btn');
const lightBox = document.querySelector('.lightbox');
const lightBoxImg = document.querySelector('.lightbox__image');
const lightBoxTitle = document.querySelector('.lightbox__caption');

// Функция создания нового DOM узла
function createCardDomNode(card) {

    const newItem = templateCard.content.querySelector('.elements__card').cloneNode(true);
    const domCardImg = newItem.querySelector('.elements__place-name');

    domCardImg.textContent = card.name;
    domCardImg.alt = card.name;
    newItem.querySelector('.elements__card-image').src = card.link;

    handleAddCardSubmit(newItem);
    return newItem;

};

// Функция рендера карточек на странице
function renderClassList() {
    const result = initialCards.map(function(item) {
        const newCard = createCardDomNode(item);
        return newCard;
    });

    //Отрисуем
    cardsContainer.prepend(...result);
};

function addCardFormListeners(evt) {
    evt.preventDefault();

    const cardName = inputName.value;
    const cardImage = inputPictureLink.value;

    const addNewCard = createCardDomNode({ name: cardName, link: cardImage });

    submitAddForm.reset();

    cardsContainer.prepend(addNewCard);

    closePopup();
};

function deleteCardHandler(evt) {
    const currentCard = evt.target.closest('.elements__card');
    currentCard.remove();
};

function likeCardHandler(evt) {
    evt.target.classList.toggle('elements__like-btn_is_active');
};

renderClassList();

function handleAddCardSubmit(cards) {
    const deleteBtn = cards.querySelector('.elements__delete-btn');
    deleteBtn.addEventListener('click', deleteCardHandler);

    const likeBtn = cards.querySelector('.elements__like-btn');
    likeBtn.addEventListener('click', likeCardHandler);

    const openLightBoxBtn = cards.querySelector('.elements__card-image');

    openLightBoxBtn.addEventListener('click', function(evt) {
        lightBox.classList.add('lightbox_opened');
        const target = evt.target;
        lightBoxImg.src = target.src;
        lightBoxImg.alt = target.closest('.elements__card').querySelector('.elements__place-name').textContent;
        lightBoxTitle.textContent = target.closest('.elements__card').querySelector('.elements__place-name').textContent;
    });

};

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

function openLightbox() {
    lightBox.classList.add('lightbox_opened');
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

    lightBox.classList.remove('lightbox_opened');
};

popupEditOpenBtn.addEventListener('click', openEditPopup);
popupAddOpenBtn.addEventListener('click', openAddPopup);

submitEditForm.addEventListener('submit', formSubmit);
submitAddForm.addEventListener('submit', addCardFormListeners);


popupEditCloseBtn.addEventListener('click', closePopup);
popupAddCloseBtn.addEventListener('click', closePopup);
lightBoxCloseBtn.addEventListener('click', closePopup);