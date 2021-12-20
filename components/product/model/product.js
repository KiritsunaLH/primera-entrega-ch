export default class Product {
    constructor(id, title, thumb, desc, code, price, stock) {
        this.id = id;
        this.timestamp = Date.now();
        this.title = title;
        this.desc = desc;
        this.code = code;
        this.thumb = thumb;
        this.price = price;
        this.stock = stock;
        this.erase = false;
    }
}