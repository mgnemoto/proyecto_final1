const express = require('express');
const router= require('./routes.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', router);
app.use('/static', express.static(__dirname + '/public'));



const port = process.env.PORT || 8080;

app.listen(port, () => {console.log("Server is running on port ${port}")});
