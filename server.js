const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const config = require('config');



const app = express();

//bodyParser middleware
app.use(express.json());

//DB config
const db = config.get('mongoURI');

//connect to mongo
mongoose.connect(db, {
    useNewUrlParser: true, 
    useCreateIndex: true 
})
    .then(()=> console.log('MongooseDB Connected...'))
    .catch(err=> console.log(err));


    

app.use('/api/items', require('./routes/api/items'));

app.use('/api/users', require('./routes/api/users'));

app.use('/api/auth', require('./routes/api/auth'));

if (process.env.NODE_ENV=== 'production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    });
}



const port = process.env.PORT || 4000;

app.listen(port, ()=> console.log(`Server started on ${port}`));