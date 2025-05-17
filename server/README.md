# LinkedIn Jobs API

An unofficial API to fetch job listings from LinkedIn. This API allows you to search for jobs using keywords, location, and date filters.

Created by: **Abhay Pawar**

## Features

- 🔍 Search jobs by keywords
- 📍 Filter by location
- 📅 Filter by posting date
- 🧹 Clean and formatted job data
- 🌐 CORS enabled
- ⚠️ Error handling
- 🛡️ Rate limiting protection


## Quick Start

```javascript
import express from 'express';
import { searchJobs } from '@atharvh01/linkedin-jobs-api';

const app = express();
const PORT = 3000;

app.get('/api/search', searchJobs);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## API Endpoints

### Search Jobs
```
GET /api/search
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| keywords | string | Yes | Search terms (e.g., "react developer") |
| location | string | Yes | Job location (e.g., "remote", "Pune") |
| dateSincePosted | string | No | Filter by post date (past_24h, past_week, past_month) |

#### Example Request
```bash
GET /api/search?keywords=react&location=remote&dateSincePosted=past_24h
```

#### Example Response
```json
{
  "success": true,
  "count": 2,
  "jobs": [
    {
      "title": "Senior React Developer",
      "company": "Example Corp",
      "location": "Remote",
      "link": "https://www.linkedin.com/jobs/view/123456789",
      "postedDate": "2023-12-20T10:00:00.000Z",
      "description": "We are looking for a Senior React Developer..."
    }
  ]
}
```

## Error Handling

The API returns appropriate error messages and status codes:

```json
{
  "success": false,
  "error": {
    "message": "Keywords parameter is required",
    "status": 400
  }
}
```

## Rate Limiting

To prevent abuse, the API implements rate limiting:
- 100 requests per hour per IP
- Customizable limits through configuration

## Testing

```bash
# Run the test suite
npm test

# Test specific endpoints
npm run test:api
```


