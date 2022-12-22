class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, stock) {
        if (!title || !description || !price || !thumbnail || !stock) {
            console.log('Complete Todos los Campos')
        } else {
            const evento = {
                id: this.#generarId(),
                title, 
                description,
                price,
                thumbnail, 
                stock 
             }
             this.products.push(evento)
        }
        }

        #generarId(){
            const id = 
            this.products.length === 0
            ? 1
            : this.products[this.products.length - 1].id + 1
            return id
        }

    getProducts() {
        console.log(this.products)
    }  
    
    getProductById(id) {
        const idProduct = this.products.find(product => product.id === id);
        idProduct ? console.log(idProduct) : console.log('Not Found')
    }
    
}

const product = new ProductManager()
product.addProduct('Silla', 'Silla desplegable', '$300','./Img/Silla', 250)
product.addProduct('Ventilador', 'Ventilador de Pie', '$500', './Img/Ventilador', 250)
product.addProduct('PlayStation', 'Consola de VideoJuegos', '$1000', './Img/PlayStation', 100)


product.getProducts()

product.getProductById(2)