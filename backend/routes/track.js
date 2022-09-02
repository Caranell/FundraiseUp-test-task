const { Router } = require('express');

const { getDbConnection } = require('../database');
const validateTracksMiddleware = require('../middleware/validateTracks');

const router = Router();
router.use(validateTracksMiddleware);

router.post('/', async (_, res) => {
  const { tracks } = res.locals;
  const db = getDbConnection();

  const tracksCollection = db.collection('Tracks');
  // apparently we dont need to wait for insert to finish
  tracksCollection.insertMany(tracks);
  res.sendStatus(200);
});

module.exports = router;
