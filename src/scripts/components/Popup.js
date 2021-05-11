export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._btnClose = this._popup.querySelector('.popup__close-btn');
    }

    setEventListeners() {
        this._btnClose.addEventListener('click', (evt) => this.close(evt));
        this._popup.addEventListener('click', (evt) => this._closeByClickOnOverlay(evt));
        document.addEventListener('keydown', (evt) => this._closeByEscape(evt));
    }

    deleteEventListeners() {
        this._btnClose.removeEventListener('click', (evt) => this.close(evt));
        this._popup.removeEventListener('click', (evt) => this._closeByClickOnOverlay(evt));
        document.removeEventListener('keydown', (evt) => this._closeByEscape(evt));
    }

    open() {
        this._popup.classList.add('popup_opened');
        // this.setEventListeners();
    }

    close() {
        this.deleteEventListeners();
        this._popup.classList.remove('popup_opened');
    }

    _closeByEscape(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeByClickOnOverlay(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

}