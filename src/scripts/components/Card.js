import { templateCard } from '../utils/utilities.js';
export default class Card {
    constructor(cardSelector, { link, name }, handleCardClick) {
        this._link = link;
        this._name = name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    // Берем шаблон
    _getTemplate() {
        const newItem = templateCard
            .content
            .querySelector(this._cardSelector)
            .cloneNode(true);
        return newItem;
    }

    // Навешиваем обработчики
    _setEventListeners() {
        // Добавление обработчика на кнопку удаления
        this._element.querySelector('.elements__delete-btn')
            .addEventListener('click', () => {
                this._deleteCardHandler();
            });

        // Добавление обработчика на кнопку like
        this._element.querySelector('.elements__like-btn')
            .addEventListener('click', () => {
                this._likeCardHandler();
            });

        // Добавление обработчика на картинку
        this._element.querySelector('.elements__card-image')
            .addEventListener('click', () => {
                this._handleCardClick(this._link, this._name);
            });

    }

    // Удаление карточки
    _deleteCardHandler() {
        this._element.remove();
    };

    // Лайк карточки
    _likeCardHandler() {
        this._element.querySelector('.elements__like-btn')
            .classList.toggle('elements__like-btn_is_active');
    };

    // Заполнение карточек контентом
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const thisImage = this._element.querySelector('.elements__card-image');

        this._element.querySelector('.elements__place-name').textContent = this._name;
        thisImage.alt = this._name;
        thisImage.src = this._link;


        return this._element;
    };
}