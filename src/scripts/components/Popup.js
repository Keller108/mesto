export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._btnClose = this._popup.querySelector('.popup__close-btn');
        this._closeByEscape = this._closeByEscape.bind(this)
    }

    setEventListeners() {
        this._btnClose.addEventListener('click', (evt) => this.close(evt));
        this._popup.addEventListener('click', (evt) => this._closeByClickOnOverlay(evt));
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeByEscape)
    }

    close() {
        document.removeEventListener('keydown', this._closeByEscape);
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