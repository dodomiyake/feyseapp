if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const express = require('express');
  const cors = require('cors');
  const connectDB = require('./db/db');
  const { readdirSync } = require('fs');
  const path = require('path');
  const passport = require('passport');
  const session = require('express-session');
  const MongoStore = require('connect-mongo');
  const flash = require('connect-flash');
  const cookieParser = require('cookie-parser');
  const helmet = require('helmet');
  
  const User = require('./models/User'); // User model
  const app = express();
  const PORT = process.env.PORT || 4040;
  const DB_URL = process.env.MONGO_URL;
  const SESSION_SECRET = process.env.SESSION_SECRET || 'defaultsecret';
  
  // Database Connection
  connectDB();
  
  // Middleware
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  app.use(helmet());
  
  // Session Configuration
  const store = MongoStore.create({
    mongoUrl: DB_URL,
    touchAfter: 24 * 60 * 60, // Update session only once in 24 hours
    crypto: { secret: SESSION_SECRET },
  });
  
  store.on('error', (e) => console.error('SESSION STORE ERROR', e));
  
  const sessionConfig = {
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  };
  
  app.use(session(sessionConfig));
  
  // Flash Messages
  app.use(flash());
  app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
  });
  
  // Passport Configuration
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
  // Dynamic Route Loading
  readdirSync(path.join(__dirname, './routes')).forEach((file) => {
    const route = require(`./routes/${file}`);
    if (typeof route === 'function') {
      app.use('/api', route);
    } else {
      console.error(`Invalid route export in file: ${file}`);
    }
  });
  
  // Default Route
  app.get('/', (req, res) => res.send('Hello World!'));
  
  // Global Error Handler
  app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
  });
  
  // Start Server
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  