import express from 'express';
import cors from 'cors';
import { searchJobs } from './controllers/jobController.js';
import { errorHandler } from './middleware/errorHandler.js';
import { limiter } from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to LinkedIn Jobs API',
    endpoints: {
      search: '/api/search?keywords=react&location=remote&dateSincePosted=past_24h'
    }
  });
});

app.get('/api/search', searchJobs);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});