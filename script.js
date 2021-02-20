let popup = document.querySelector('.popup'),
    openBtn = document.getElementById('openBtn'),
    closeBtn = document.getElementById('closeBtn'),
    profileName = document.getElementById('name'),
    profileDescription = document.getElementById('description'),
    submitBtn = document.getElementById('submit'),
    fieldName = document.getElementById('fieldName'),
    fieldDescr = document.getElementById('fieldDescription');

openBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
submitBtn.addEventListener('click', closePopup);

function openPopup() {
    popup.classList.add('popup_status_opened');
}

function closePopup() {
    popup.classList.remove('popup_status_opened');
}

submitBtn.onclick = function() {
    let nameVal = fieldName.value;
    let descrVal = fieldDescr.value;
    profileName.innerHTML = nameVal;
    profileDescription.innerHTML = descrVal;
};