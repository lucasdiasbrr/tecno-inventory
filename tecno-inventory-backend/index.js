const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/items');
const sequelize = require('./config/database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', itemRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});
