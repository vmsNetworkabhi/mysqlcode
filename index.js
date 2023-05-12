const express = require('express');
const app = express();
const cors = require('cors')
const helmet = require("helmet");
const bodyParser = require('body-parser');
const itemRouter = require('./routers/itemRouter');
const Port = 4000;
app.use(bodyParser.json())
app.use(helmet());
app.use(cors('*'));

app.use('/item', itemRouter);

app.listen(Port, () =>{
  console.log('server started')
})