const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors({origin:"http://localhost:3000",
        methods:"GET,HEAD,PUT,PATCH,POST,DELETE"
        }));

// Init middleware
// app.use(logger);

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Users api routes
app.use('/api/users', require('./routes/api/users'));

// Login api routes
app.use('/api/authn', require('./routes/api/login'));

// Blog posts api routes
app.use('/api/blogPosts', require('./routes/api/blogPosts'));

// Connect to DB
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true}, () => console.log('connected to DB'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
