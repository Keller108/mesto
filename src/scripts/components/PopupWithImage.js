import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupImage, popupCaption) {
        super(popupSelector);
        this._popupImage = popupImage;
        this._popupCaption = popupCaption;
    }

    open(element) {
        super.open();
        this._popupImage.src = element.link;
        this._popupImage.alt = element.name;
        this._popupCaption.textContent = element.name;
    }
}