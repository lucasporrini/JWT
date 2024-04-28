import config from "./config/config";
import dotenv from 'dotenv';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const basicRoutes = require('./routes/basic');
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');

dotenv.config();

app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/', basicRoutes);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

const PORT = config.server.port || 3000;
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});