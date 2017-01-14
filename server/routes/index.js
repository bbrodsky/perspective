const router = require('express').Router();

router.use('/twilio', require('./twilio'));

// No API routes matched --> 404
router.use((req, res) => res.status(404).end());

module.exports = router;
