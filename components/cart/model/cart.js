import { v4 as uuidv4 } from 'uuid';

export default class Cart {
    constructor() {
        this.products = [];
        this.id = uuidv4();
        this.timestamp = Date.now();
    }
}

