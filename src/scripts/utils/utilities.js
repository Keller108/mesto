export const initialCards = [{
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

export const validationObject = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

export const containerSelector = '.elements__cards';
export const lightBoxSelector = '.popup_type_lightbox';
export const fieldName = document.querySelector('#form__name');
export const fieldDescr = document.querySelector('#form__job');
export const popupEditOpenBtn = document.querySelector('.profile__edit-button');
export const popupAddOpenBtn = document.querySelector('.profile__add-button');
export const templateCard = document.querySelector('.template');
export const cardsContainer = document.querySelector('.elements__cards');
export const popupUserFormSelector = '.popup_type_profile';
export const popupFormSelector = '.popup_type_card-add';
export const submitBtn = document.querySelectorAll('.form__submit-btn');
export const forms = document.querySelectorAll('.form');