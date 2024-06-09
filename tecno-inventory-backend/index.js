const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/items');
const brandRoutes = require('./routes/brands');
const modelRoutes = require('./routes/models');
const categoryRoutes = require('./routes/categories');
const locationRoutes = require('./routes/locations');
const stateRoutes = require('./routes/states');
const supplierRoutes = require('./routes/suppliers');
const responsibleRoutes = require('./routes/responsibles');
const physicalConditionRoutes = require('./routes/physicalConditions');
const operatingSystemRoutes = require('./routes/operatingSystems');
const technicalSpecificationRoutes = require('./routes/technicalSpecifications');
const sequelize = require('./config/database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/items', itemRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/responsibles', responsibleRoutes);
app.use('/api/physicalConditions', physicalConditionRoutes);
app.use('/api/operatingSystems', operatingSystemRoutes);
app.use('/api/technicalSpecifications', technicalSpecificationRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Falha ao sincronizar com o banco de dados:', err);
});
