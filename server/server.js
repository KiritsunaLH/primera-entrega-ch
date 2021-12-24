import express from 'express'
import cors from 'cors'

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.host = process.env.HOST || 'localhost';
        this.productsPath = '/api/products';
        this.cartPath = '/api/cart';
        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    
    routes() {
        this.app.use(this.productsPath, require('./routes/product.js'));
        this.app.use(this.cartPath, require('./routes/cart.js'));
    }
    
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://${this.host}:${this.port}`);
        });
    }
}

export {Server}