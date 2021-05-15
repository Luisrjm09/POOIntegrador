const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || 4000;

app.use(express.json({extended:true}));

app.use('/api/servicios',require('./routes/services'));
app.use('/api/inventario',require('./routes/inventory'));
app.use('/api/clientes',require('./routes/clients'));
app.use('/api/ticket',require('./routes/tickets'));
app.use('/api/movimientos',require('./routes/moves'));
app.use('/api/usuarios',require('./routes/users'));

app.listen(port,()=>{
    console.log(`Server connected on port ${port}`);
})