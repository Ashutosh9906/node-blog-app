const rateLimit = require("express-rate-limit");

const signinLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Allow max 5 attempts per 15 minutes
    message: "Too many login attempts from this IP. Please try again after 15 minutes.",
    standardHeaders: true,
    legacyHeaders: false,
});

const generalLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Allow 100 requests per 10 minutes per IP
    message: "Too many requests from this IP. Please try again after a while.",
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    signinLimiter,
    generalLimiter
}