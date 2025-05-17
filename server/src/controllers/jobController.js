import { fetchJobListings } from '../services/linkedinService.js';
import { validateSearchParams } from '../utils/validator.js';

export async function searchJobs(req, res, next) {
  try {
    const { keywords, location, dateSincePosted } = req.query;
    
    // Validate required parameters
    const validationError = validateSearchParams(keywords, location);
    if (validationError) {
      return res.status(400).json({
        success: false,
        error: {
          message: validationError,
          status: 400
        }
      });
    }

    const jobs = await fetchJobListings(keywords, location, dateSincePosted);
    
    if (!jobs || jobs.length === 0) {
      return res.json({
        success: true,
        count: 0,
        jobs: [],
        message: 'No jobs found matching your criteria'
      });
    }

    res.json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    next(error);
  }
}