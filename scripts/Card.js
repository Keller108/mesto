<<<<<<< HEAD
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

=======
export default class Card {
    constructor(name, link, openPopup) {
        this._name = name;
        this._link = link;
        this._openPopup = openPopup;
    }

    // Берем шаблон
    _getTemplate() {
        const newItem = templateCard
            .content
            .querySelector('.elements__card')
            .cloneNode('true');
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
                this._openPopup(lightBox);

                lightBoxImg.src = this._link;
                lightBoxImg.alt = this._element.closest('.elements__card').querySelector('.elements__place-name').textContent;
                lightBoxTitle.textContent = this._element.closest('.elements__card').querySelector('.elements__place-name').textContent;
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
        this._element.querySelector('.elements__place-name').textContent = this._name;
        this._element.querySelector('.elements__card-image').alt = this._name;
        this._element.querySelector('.elements__card-image').src = this._link;

        return this._element;
    };
>>>>>>> refactoring/classes-creating
}