// tecno-inventory-backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./config/database');
const itemRoutes = require('./routes/items');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
