let popupEdit = document.querySelector('.popup-edit'),
    popupEditOpenBtn = document.querySelector('.profile__edit-button'),
    popupEditCloseBtn = document.querySelector('.popup-edit__close-btn'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description'),
    fieldName = document.querySelector('.form__input_el_name'),
    fieldDescr = document.querySelector('.form__input_el_descr'),
    submitFormEdit = document.querySelector('.edit-form'),
    submitFormAdd = document.querySlector('.add-form');

function openPopup() {
    popupEdit.classList.add('popup-edit_opened');
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
    popupEdit.classList.remove('popup-edit_opened');
};

popupEditOpenBtn.addEventListener('click', openPopup);
submitFormEdit.addEventListener('submit', formSubmit);
popupEditCloseBtn.addEventListener('click', closePopup);