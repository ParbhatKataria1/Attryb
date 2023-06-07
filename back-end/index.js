const express = require('express');
const { connection } = require('./db');
const cors = require('cors');
const { auth } = require('./routes/auth.routes');
const { authentication } = require('./middlewares/auth.middleware');
const { oem } = require('./routes/oem.routes');
require('dotenv').config();
const app = express();

app.use(cors())

app.use(express.json());

app.use('/auth', auth);

app.use(authentication);
 
app.use('/oem', oem);

app.use('*', async(req, res)=>{
    res.status(422).send('wrong path')
})


app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log('server is running ')
    } catch (error) {
        console.log('server is not running')
    }
})