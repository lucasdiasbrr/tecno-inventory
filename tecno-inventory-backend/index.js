const express = require('express');
const app = express();
const sequelize = require('./config/database');
const Item = require('./models/item');
const itemRoutes = require('./routes/items');

const port = 3000;

app.use(express.json());
app.use('/api', itemRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Sincronizar o banco de dados
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
