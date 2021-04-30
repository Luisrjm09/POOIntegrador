const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || 4000;

app.use(express.json({extended:true}));

app.use('/api/servicios',require('./routes/services'));

app.listen(port,()=>{
    console.log(`Server connected on port ${port}`);
})