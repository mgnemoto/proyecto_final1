const express = require('express');
const router= require('./routes.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', router);
app.use('/static', express.static(__dirname + '/public'));





app.listen(8080, () => {console.log("Server is running on port 8080")});
