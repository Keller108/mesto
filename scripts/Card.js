export default class Card {
    constructor(link, name, openLightbox) {
        this._link = link;
        this._name = name;
        this._openLightbox = openLightbox;
    }

    // Берем шаблон
    _getTemplate() {
        const newItem = templateCard
            .content
            .querySelector('.elements__card')
            .cloneNode('true');
        я
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
                this._openLightbox(this._link, this._name);
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
}