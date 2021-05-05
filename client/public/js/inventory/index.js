const UI = require('../helpers/UI');
const {URL_API} = require('../config');
const axios = require('axios');
const sa2 = require('sweetalert2');
const {Alert} = require('../helpers/alerts');
const { ModalUI } = require('../helpers/Modal');
const { Form } = require('../helpers/Forms');

class Inventory{
    async addCategory(category){
        try {  
            console.log(category);

            const { data } = await axios.post(`${URL_API}inventario/agregar/categoria`,{
                category
            });

            if(data.status===200){
                sa2.fire({
                    title:data.message,
                    icon:'success'
                }).then(result=>{
                    if(result.isConfirmed){
                        window.location.reload(true); 
                    }
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(){
        const description = document.getElementById('addProductName').value;
        const category = document.getElementById('categorys').value;
        const stock = document.getElementById('addProductStock').value;
        const price = document.getElementById('addProductPrice').value;
        const sell = document.getElementById('addProductSell').value; 

        try {
            const { data } = await axios.post(`${URL_API}inventario/agregar/producto`,{
                description,
                category,
                stock,
                price,
                sell
            });

            console.log(data);
            if(data.status===200){
                Alert.querySuccess(data.message);
                return;
            }

            Alert.queryError(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    confirmDelete(e){
        const codigo = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
        sa2.fire({
            title:`Estas seguro de eliminar?`,
            icon:'warning',
            showCancelButton:true,
            cancelButtonText:'No',
            confirmButtonText:'Si'
        })
        .then(result=>{
            if(result.isConfirmed){
                this.deleteProduct(codigo);
            }
        });
    }

    async deleteProduct(idProduct){
        try {
            console.log(idProduct);
            const { data } = await axios.post(`${URL_API}inventario/borrar/producto`,{
                idProduct
            });
            
            if(data.status===200){
                Alert.deleteSuccess(data.message,idProduct);
                return;
            }

        } catch (error) {
            console.log(error);
        }
    }

    async saveEditProduct(){
        const description = document.getElementById('editProductDescription').value;
        const category = document.getElementById('editCategory').value;
        const stock = document.getElementById('editProductStock').value;
        const price = document.getElementById('editProductPrice').value;
        const sell = document.getElementById('editProductSell').value;
        const idProduct = document.getElementById('editProductCode').value;
                
        try {
            const { data } = await axios.post(`${URL_API}inventario/editar/producto`,{
                description,
                category,
                stock,
                price,
                sell,
                idProduct
            });

            console.log(data);

            if(data.status===200){
                Alert.querySuccess(data.message);
                return;
            }

            Alert.queryError(data.error);
        } catch (error) {
           console.log(error); 
        }
    }
}

const ActionsUI = new Inventory();

document.getElementById('btnAddCategory').addEventListener('click',()=>{
    ActionsUI.addCategory(document.getElementById('addCategory').value);
});

// [PAGE LOADS] ///////////////////////////////////////////////////////
// [GET CATEGORYS] //////////////////////////////////////////////////

let categorys = null;

try {
    const services = async() =>{
        /* FETCH INVENTORY */
        const {data} = await axios.get(`${URL_API}inventario`); 
        
        /* FETCH CATEGORYS */
        const resultCategorys = await axios.get(`${URL_API}inventario/categorias`);
        const inventory = data.inventory;
        categorys = resultCategorys.data.categorys;

        /* INSERT CATEGORYS INTO MODAL */
        const Inputs = new UI.Inputs();
        // ADD PRODUCT
        Inputs.createSelect(categorys,'categorys','idCategoria','nombre');

        const Rows = new UI.Table(inventory);
        Rows.createRow('bodyServices',['codigo','descripcion','nombre','stock','precioCompra','precioVenta'],'codigo');
        Rows.addActions('bodyServices',['fas fa-trash-alt','fas fa-pen'],['deleteProduct','editProduct']);

        document.querySelectorAll('.deleteProduct').forEach(button=>{
            button.addEventListener('click',(e)=>ActionsUI.confirmDelete(e));
        });   

        document.querySelectorAll('.editProduct').forEach(button=>{
            button.addEventListener('click',(e)=>{
                ModalUI.openModal('btnOpenEdit');

                const Data = new UI.Table();
                infoProduct = Data.getInfoRow(e);
                console.log(infoProduct);
                Form.setData([
                    {'editProductDescription':infoProduct.descripcion},
                    {'editProductStock':infoProduct.stock},
                    {'editProductPrice':infoProduct.precioCompra},
                    {'editProductSell':infoProduct.precioVenta},                    
                ]);
                document.getElementById('editProductCode').value = infoProduct.codigo;
                Form.setSelect(categorys,'editCategory','idCategoria','nombre',infoProduct.categoria);
                
            });
        });   

    }   

    services();
} catch (error) {
    console.log(`There was an error ${error}`);
}

// [MODAL ADD PRODUCT] //////////////////////////////////////////////////
document.getElementById('btnAddProduct').addEventListener('click',() => {
    ActionsUI.addProduct();
});

// [MODAL SAVE PRODUCT] //////////////////////////////////////////////
document.getElementById('btnEditProduct').addEventListener('click',(e)=>{
    ActionsUI.saveEditProduct();
})