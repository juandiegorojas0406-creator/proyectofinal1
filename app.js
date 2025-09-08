const mongoose = require('mongoose');

// URL de conexión a MongoDB con Compass
const url = 'mongodb://localhost:27017/universidad';

mongoose.connect(url, {})
  .then(() => console.log('✅ Base de datos conectada correctamente'))
  .catch((e) => console.log('❌ Se detectó un error en la conexión: ' + e));
