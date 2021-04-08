import { openPopup, closePopup } from './script.js';

export default class Card {
    constuctor(templateSelector, object) {
        this._templateSelector = templateSelector;
        this._object = object;
    }

    _createCard() {
        const cardElement = this._templateSelector.content.querySelector('.elements__card').cloneNode(true);
        const cardImg = cardElement.querySelector('.elements__place-name');
        cardImg.textContent = this._object.name;
        cardImg.alt = this._object.name;
        cardElement.querySelector('.elements__card-image').src = this._object.link;

        return cardElement;
    }

    _setListeners() {
        const cardDelBtn = this._element.querySelector('.elements__delete-btn');
        cardDelBtn.addEventListener('click', (evt) => {
            const currentCard = evt.target.closest('.elements__card');
            currentCard.remove();
        });

        const likeBtn = this._element.querySelector('.elements__like-btn');
        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('elements__like-btn_is_active');
        });

        const openLightBoxBtn = cards.querySelector('.elements__card-image');
        openLightBoxBtn.addEventListener('click', function(evt) {
            openPopup(lightBox);
            const target = evt.target;
            lightBoxImg.src = target.src;
            lightBoxImg.alt = target.closest('.elements__card').querySelector('.elements__place-name').textContent;
            lightBoxTitle.textContent = target.closest('.elements__card').querySelector('.elements__place-name').textContent;
        });
    }

    getCard() {
        this._element = this._createCard;
        this._setListeners();
        return this._element;
    }

}