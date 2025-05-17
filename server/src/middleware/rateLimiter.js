import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again after an hour',
      status: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});