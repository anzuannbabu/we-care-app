



const express = require('express');
const swaggerUi = require('swagger-ui-express');//swagger
const swaggerJsDoc = require('swagger-jsdoc');//swagger
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const port = 8008;
const app = express();

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
// Parses the text as json
app.use(bodyParser.json());
app.use(cors())


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'A sample API for learning Swagger',
        },
        servers: [
            {
                url: 'http://localhost:' + port,
            },
        ],
    },
    apis: ['./routes/*.js'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: true}));


app.use('/', api);

app.listen(port, () => {
    console.log("The application lister on port " + port)
    console.log(`swagger url http://localhost:${port}/api-docs`)
})