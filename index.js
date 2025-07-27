const express = require('express');
const app = express();

require('dotenv').config();
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/orders', require('./routes/orders'));
app.use('/logs', require('./routes/auditLogs'));

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

module.exports = app;
