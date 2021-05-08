import { templateCard } from '../utils/utilities.js';
export default class Card {
    constructor(cardSelector, { myId, link, name, likes, owner, _id }, handleCardClick, deleteCard, putLike, removeLike) {
        this._cardSelector = cardSelector;
        this._myId = myId;
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._ownCardId = owner._id;
        this._handleCardClick = handleCardClick;
        this._deleteCard = deleteCard;
        this._cardId = _id;
        this._putLike = putLike;
        this._removeLike = removeLike;
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

        const deleteCardBtn = this._element.querySelector('.elements__delete-btn');
        deleteCardBtn.addEventListener('click', () => {
            this._deleteCard(this._cardId);
        })

        // Добавление обработчика на картинку
        this._element.querySelector('.elements__card-image')
            .addEventListener('click', () => {
                this._handleCardClick(this._link, this._name);
            });

        const like = this._element.querySelector('.elements__like-btn');
        like.addEventListener('click', () => {
            !like.classList.contains('elements__like-btn_is_active') ?
                this._putLike(this._cardId) :
                this._removeLike(this._cardId)
        })

        this._element.querySelector('.elements__likes-counter').textContent = this._likes.length

    }

    // Заполнение карточек контентом
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const thisImage = this._element.querySelector('.elements__card-image');

        this._element.querySelector('.elements__place-name').textContent = this._name;
        thisImage.alt = this._name;
        thisImage.src = this._link;

        if (this._myId === this._ownCardId) {
            this._element.querySelector('.elements__delete-btn').classList.add('elements__delete-btn_visible')
        }

        this._likes.forEach(like => {
            if (like._id === this._myId) {
                this._element.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_is_active')
            }
        })

        return this._element;
    };
}