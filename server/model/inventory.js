const db = require('../config');

class Inventory{
    async addCategory(request,response,next){
        const { category } = request.body;
        
        console.log(`■ Adding ${category}...`);

        db.query(`INSERT INTO categoria values (?,?)`,
        [null,category],
        (error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    message:error
                });
            }

            return response.json({
                status:200,
                message:`${category} agregado correctamente.`
            });
        })
    }

    async getInventory(request,response,next){

        console.log(`■ Requesting inventory...`)

        db.query(`SELECT * FROM inventario 
        INNER JOIN categoria ON 
        inventario.categoria = categoria.idCategoria
        ORDER BY codigo DESC`,
        (error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    message:`Intente mas tarde...`
                });
            }
            console.log(result);
            return response.json({
                status:200,
                inventory:result
            });
        });
    }

    async getCategorys(request,response,next){
        db.query(`SELECT * FROM categoria`,(error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    message:error
                });
            }
            return response.json({
                status:200,
                categorys:result
            });
        })
    }

    async addProduct(request,response,next){

        console.log(`■ Adding product to inventory...`);
        const { description,category,stock,price,sell } = request.body;

        db.query(`INSERT INTO inventario values (?,?,?,?,?,?,?)`,
        [null,'',description,stock,category,price,sell],
        (error,result,columns)=>{
            if(error){
                console.log(`■ Error: ${error}`);
                return response.json({
                    status:500,
                    message:error
                })
            }
            return response.json({
                status:200,
                message:`Producto agregado.`
            });
        })
    }

    async deleteProduct(request,response,next){
        const { idProduct } = request.body;
        console.log(`■ Deleting product ${idProduct}...`);

        db.query(`DELETE FROM inventario WHERE codigo = ?`,
        idProduct,
        (error,result,columns)=>{
            if(error){
                return response.json({
                    status:500,
                    message:error
                })
            }
            return response.json({
                status:200,
                message:`Producto eliminado`
            });
        })
    }

    async editProduct(request,response,next){
        const {description,category,stock,price,sell,idProduct} = request.body;
        
        console.log(`■ Updating ${idProduct}...`)
        
        db.query(`UPDATE inventario SET descripcion = ?,
        stock = ?,
        categoria = ?,
        precioCompra = ?,
        precioVenta = ? 
        WHERE codigo = ?
        `, [description,stock,category,price,sell,idProduct], (error,result,columns)=>{
            if(error){
                console.log(error);
                return response.json({
                    status:500,
                    error
                });
            }
            return response.json({
                status:200,
                message:`Producto actualizado`
            });
        })
    }
}

const ModelInvetory = new Inventory();

module.exports = ModelInvetory;