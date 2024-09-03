if (process.env.NODE_ENV !== 'production') {
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
const MongoStore = require('connect-mongo'); // Import MongoStore
const User = require('./models/User'); // Import User model

const app = express();
const port = process.env.PORT || 5000;
const dbUrl = process.env.MONGO_URL; // Define dbUrl from environment variables

// Connect to the database
connectDB(); // Ensure this function connects to MongoDB correctly

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5174', // Update this with your frontend URL in production
    credentials: true
}));


// Setup session store
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

// Session configuration
const sessionConfig = {
    store,
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // Correct usage of LocalStrategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
readdirSync(path.join(__dirname, './routes')).map((route) =>
    app.use('/api', require(`./routes/${route}`))
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
