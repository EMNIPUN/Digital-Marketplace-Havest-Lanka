import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   max: 500,
   standardHeaders: true,
   legacyHeaders: false,
   message: { message: 'Too many requests from this IP, please try again after 15 minutes.' },
});

export const authLimiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   max: 20,
   standardHeaders: true,
   legacyHeaders: false,
   message: { message: 'Too many authentication attempts, please try again after 15 minutes.' },
});
