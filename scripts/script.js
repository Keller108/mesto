let popup = document.querySelector('.popup'),
    openBtn = document.getElementById('openBtn'),
    closeBtn = document.getElementById('closeBtn'),
    profileName = document.getElementById('name'),
    profileDescription = document.getElementById('description'),
    fieldName = document.getElementById('fieldName'),
    fieldDescr = document.getElementById('fieldDescription'),
    submitBtn = document.getElementById('submit');

function openPopup() {
    popup.classList.add('popup_status_opened');
}

function closePopup() {
    popup.classList.remove('popup_status_opened');
}

function fieldValInsert() {
    let fieldNameVal = profileName.textContent,
        fieldDescrVal = profileDescription.textContent;
    fieldName.value = fieldNameVal;
    fieldDescr.value = fieldDescrVal;
}

submitBtn.onclick = function() {

    let nameVal = fieldName.value,
        descrVal = fieldDescr.value;

    profileName.innerText = nameVal;
    profileDescription.innerText = descrVal;
};

openBtn.addEventListener('click', fieldValInsert);
openBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
submitBtn.addEventListener('click', closePopup);