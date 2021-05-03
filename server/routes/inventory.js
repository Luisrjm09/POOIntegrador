const express = require('express');
const router = express.Router();
const ModelInvetory = require('../model/inventory');

router.post('/agregar/categoria',
    ModelInvetory.addCategory
);

router.get('/',
    ModelInvetory.getInventory
);

router.get('/categorias',
    ModelInvetory.getCategorys
);

router.post('/agregar/producto',
    ModelInvetory.addProduct
);

router.post('/borrar/producto',
    ModelInvetory.deleteProduct
);

router.post('/editar/producto',
    ModelInvetory.editProduct
);

module.exports = router;