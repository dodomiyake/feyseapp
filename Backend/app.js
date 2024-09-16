if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Import necessary modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const { readdirSync } = require('fs');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Import MongoStore
const User = require('./models/User'); // Import User model
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const helmet = require('helmet'); // Import Helmet

const app = express();
const port = process.env.PORT || 4040;
const dbUrl = process.env.MONGO_URL; // Define dbUrl from environment variables

// Connect to the database
connectDB(); // Ensure this function connects to MongoDB correctly

// Middleware setup
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Update this with your frontend URL in production
    credentials: true
}));

// Security middleware
app.use(helmet()); // Add Helmet for security

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
    saveUninitialized: false, // Avoid creating sessions for non-logged-in users
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Cookie expires in 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));

// Flash messages middleware
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); // Use email as the username field
passport.serializeUser(User.serializeUser()); // Serialize user to session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

// Routes
readdirSync(path.join(__dirname, './routes')).map((route) => {
    app.use('/api', require(`./routes/${route}`));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
