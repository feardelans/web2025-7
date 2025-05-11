const express = require('express');
require('dotenv').config();


const { sequelize } = require('./models');
const deviceRoutes = require('./routes/devices');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());

app.use(deviceRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) // створить таблиці автоматично
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB sync error:", err);
  });

