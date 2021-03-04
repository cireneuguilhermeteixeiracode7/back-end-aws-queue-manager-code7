const express = require('express')
const bodyParser = require("body-parser");
const path = require('path');
const snsRouter = require('./app/routes/sns-routes')
const sqsRouter = require('./app/routes/sqs-routes')
const cors = require('cors')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



const uri = '/api'

app.use(`${uri}/sns`,snsRouter)
app.use(`${uri}/sqs`,sqsRouter)




app.use(express.static(path.join(__dirname,  "./www")));
// app.get('/*', function(req,res) {
//     res.sendFile(path.join(__dirname+'/www/index.html'));
// });


const port = process.env.PORT || 3000
app.listen( port, ()=> console.log(`servidor rodando na porta ${port}`))

module.exports = app;
