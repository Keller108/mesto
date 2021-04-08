// Перенесем все переменные, объекты из других файлов

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
];
// Объект валидации
const validationObject = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

const lightBoxImg = document.querySelector('.popup__image');
const lightBoxTitle = document.querySelector('.popup__caption');
const lightBox = document.querySelector('.popup_type_lightbox');
const popupAdd = document.querySelector('.popup_type_card-add');
const popupEdit = document.querySelector('.popup_type_profile');
const profileFormEdit = document.querySelector('.edit-form');
const profileFormAdd = document.querySelector('.add-form');
const inputName = document.querySelector('.form__input_el_place');
const inputPictureLink = document.querySelector('.form__input_el_pic-link');
const fieldName = document.querySelector('.form__input_el_name');
const fieldDescr = document.querySelector('.form__input_el_descr');
const popupEditOpenBtn = document.querySelector('.profile__edit-button');
const popupAddOpenBtn = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const templateCard = document.querySelector('.template');
const cardsContainer = document.querySelector('.elements__cards');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');
const popups = document.querySelectorAll('.popup');