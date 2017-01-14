const express = require('express');
const router = express.Router();
const AccessToken = require('twilio').AccessToken;
const VideoGrant = AccessToken.VideoGrant;

let identityString = 0;
router.get('/token', (req, res) => {
  const identity = (identityString++).toString();
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );
  token.identity = identity;

  const grant = new VideoGrant();
  grant.configurationProfileSid = process.env.TWILIO_CONFIGURATION_SID;
  token.addGrant(grant);

  res.send({
    identity: identity,
    token: token.toJwt()
  });
});

module.exports = router;
