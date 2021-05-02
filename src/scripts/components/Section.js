export default class Section {
    constructor(containerSelector) {
        this._containerSelector = containerSelector;
    }

    renderItems({ items, renderer }) {
        items.forEach(item => {
            renderer(item)
        })
    };

    addItem(card) {
        this._containerSelector.prepend(card)
    };
}