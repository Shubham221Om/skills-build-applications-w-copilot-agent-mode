import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use(express.json());
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1,
    apiBaseUrl: getApiBaseUrl(),
  });
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});
