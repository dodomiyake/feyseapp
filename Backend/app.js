if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
  }
  

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const { readdirSync } = require('fs');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require('./models/User');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 4040;
const dbUrl = process.env.MONGO_URL;

// Connect to the database
connectDB();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(helmet());

// Session setup
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: process.env.SESSION_SECRET || 'defaultsecret',
    }
});

store.on('error', function(e) {
    console.log('SESSION STORE ERROR', e);
});

const sessionConfig = {
    store,
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // This allows some cross-site usage but mitigates CSRF attacks
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days in milliseconds
    }    
};

app.use(session(sessionConfig));

if (!process.env.SESSION_SECRET && process.env.NODE_ENV === 'production') {
    console.error("SESSION_SECRET is not set in production!");
    process.exit(1); // Or handle it accordingly
  }
  

// Flash messages middleware
app.use(flash());

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());  // If using session-based authentication

// Use LocalStrategy and tell Passport to use email as the username
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, User.authenticate()));  // User.authenticate() is provided by passport-local-mongoose

// Serialize and deserialize user (for session handling)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
readdirSync(path.join(__dirname, './routes')).map((route) => {
    app.use('/api', require(`./routes/${route}`));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
