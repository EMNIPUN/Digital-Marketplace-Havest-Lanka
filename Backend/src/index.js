import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import bidPostRouter from './routes/farmerManagement/createBidPost.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/createBidPost', bidPostRouter);

const port = 8005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});