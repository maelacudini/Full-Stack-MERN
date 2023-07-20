const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));


//define routes
app.get('/', (req, res) => res.send(`Server started on port ${PORT}!`)); //test route main
app.use('/api/users', require('./routes/api/users')); //user route referring to ./routes/api/users
app.use('/api/profile', require('./routes/api/profile')); //user route referring to ./routes/api/profile
app.use('/api/post', require('./routes/api/post')); //user route referring to ./routes/api/post
app.use('/api/auth', require('./routes/api/auth')); //user route referring to ./routes/api/auth


app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
