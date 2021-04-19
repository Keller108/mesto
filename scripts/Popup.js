export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    setEventListener() {
        this._popup.querySelector('.popup__close-btn')
            .addEventListener('click',
                () => this._close()
            )
    }

    open() {
        this._popup.classList.add('.popup_opened');
    }

    close() {
        this._popup.classList.remove('.popup_opened');
    }

}

// open(popupSelector) {
//     popupSelector.classList.add('popup_opened');
//     document.addEventListener('keydown', closeByEscape);
//     _disableBtnBeforePopup(addBtn);
// }

// close(popupSelector) {
//     popupSelector.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closeByEscape);
// }

// _handleEscClose(evt) {
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened')
//         closePopup(openedPopup);
//     }
// }

// setEventListener() {
//     const popupCloseButtons = document.querySelectorAll('.popup__close-btn');

//     popupCloseButtons.forEach(function(item) {
//         btn.addEventListener('click', evt => {
//             const popupToClose = evt.target.closest('.popup_opened');
//             closePopup(popupToClose);
//         });
//     });
// }

// _disableBtnBeforePopup(btn) {
//     btn.classList.add(validationObject.inactiveButtonClass);
//     btn.setAttribute('disabled', 'disabled');
// }