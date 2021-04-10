export default class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }

    _getTemplate() {
        const newItem = templateCard
            .content
            .querySelector('.elements__card')
            .cloneNode('true');
        return newItem;
    }

    _setEventListeners() {

    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.elements__place-name').textContent = this._name;
        this._element.querySelector('.elements__card-image').alt = this._name;
        this._element.querySelector('.elements__card-image').src = this._link;

        return this._element;
    };
}