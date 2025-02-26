const cors = require('cors')
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = require('./router/index');


const app = express()
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173', // ✅ Your frontend URL
    credentials: true,               // ✅ Allow credentials (cookies, sessions)
  }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: 'lax' },
}));
app.use('/api',router);

app.get('/', (req, res) => {
    res.send('Hello, World!')
})
  
app.listen(PORT, (req, res) => { 
    console.log(`Server is running on port ${PORT} `)
})