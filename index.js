import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';
import logRoutes from './routes/logs.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/logs', logRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
