export default class Section {
    constructor(renderer, container) {
        // this._items = items;
        this._renderer = renderer;
        this._container = container;
    }

    renderItems(items) {
        items.reverse().forEach(item => {
            this._renderer(item);
        });
    }

    addItem(card) {
        this._container.prepend(card)
    };
}