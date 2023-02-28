import fs from 'fs';
export class CartManager {
    constructor(path){
        this.path = path;
    }
    async getCarts(limit){
        try{
            if(fs.existsSync(this.path)){
                const infoCarts = await fs.promises.readFile(this.path, 'utf-8');
                if(limit === 'max'){
                    const infoCartsJS = JSON.parse(infoCarts);
                    return infoCartsJS;
                }else{
                    const infoCartsJS = JSON.parse(infoCarts).slice(0,limit);
                    return infoCartsJS;
                }
            }else{
                return [];
            }
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
    async addCart(){
        try{
            const cart ={
                id: await this.#generateId(),
                products:[]       
            }
            const carts = await this.getCarts();        
            carts.push(cart);           
            await fs.promises.writeFile(this.path,JSON.stringify(carts));
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    async getCartById(id){
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === parseInt(id));
        if (cart === undefined)  return console.log("Not found")
        else return cart;
    }
    async updateCartById(id,products){
        const carts = await this.getCarts();
        const index = carts.findIndex((c) => c.id === parseInt(id));
        if (index === -1){
            throw new Error('Carro no encontrado');
        }else{
            const updatedCart={...carts[index],products};
            products.splice(index,1,updatedCart);
            await fs.promises.writeFile(this.path,JSON.stringify(carts));
            return updatedCart
        }
    }

    async deleteCartById(id){
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === parseInt(id));
        if (cart === undefined)  return console.log("Not found")
        else {
            const index = carts.indexOf(cart);
            carts.splice(index,1);
        }
        await fs.promises.writeFile(this.path,JSON.stringify(carts));
    }

    async addProductToCartById(idC,idP,quantity){
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === parseInt(idC));
        if (cart === undefined)  return console.log("Not found")
        else {
            const index = carts.indexOf(cart);
            if (carts[index].products.find((p) => p.id === parseInt(idP))){
                const indexP = 
                    carts[index]
                        .products.indexOf(carts[index]
                        .products.find((p) => p.id === parseInt(idP)));
                carts[index].products[indexP].quantity += quantity;
                await fs.promises.writeFile(this.path,JSON.stringify(carts));
                return carts[index].products[indexP];
            }else{
                const id = parseInt(idP);
                const product = {
                id: id,
                quantity: quantity
                }
                carts[index].products.push(product);
                await fs.promises.writeFile(this.path,JSON.stringify(carts));
                return product;
            }
        }

    }

    async #generateId(){
        const carts = await this.getCarts();
        const id = carts.length === 0
         ? 1 
         : carts[carts.length -1].id + 1;
        return id;
    }

}