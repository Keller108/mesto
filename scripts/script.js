let popup = document.querySelector('.popup'),
    openBtn = document.querySelector('.profile__edit-button'),
    closeBtn = document.querySelector('.popup__close-btn'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description'),
    fieldName = document.querySelector('.form__input_el_name'),
    fieldDescr = document.querySelector('.form__input_el_descr'),
    submit = document.querySelector('.form');

function openPopup() {
    popup.classList.add('popup_opened');
    fieldName.value = profileName.textContent;
    fieldDescr.value = profileDescription.textContent;
};

function formSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = fieldName.value;
    profileDescription.textContent = fieldDescr.value;
    closePopup();
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

openBtn.addEventListener('click', openPopup);
submit.addEventListener('submit', formSubmit);
closeBtn.addEventListener('click', closePopup);