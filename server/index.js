import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './DB/connection.js';
import itemRoutes from './Routes/itemRoutes.js';
import itemTypeRoutes from './Routes/itemTypeRoutes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/itemTypes', itemTypeRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Inventory Management API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});