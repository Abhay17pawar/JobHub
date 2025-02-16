import express from 'express';
import { searchJobs } from '@atharvh01/linkedin-jobs-api';

const app = express();
const PORT = 3000;

app.get('/api/search', searchJobs);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});