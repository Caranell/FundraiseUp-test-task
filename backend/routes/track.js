const { Router } = require('express');

const { getDbConnection } = require('../database');
const validateTracksMiddleware = require('../middleware/validateTracks');

const router = Router();
router.use(validateTracksMiddleware);

router.post('/', async (_, res) => {
  const { tracks } = res.locals;
  const db = getDbConnection();

  const tracksCollection = db.collection('Tracks');
  const result = await tracksCollection.insertMany(tracks);

  res.status(200).send({ insertedTracks: result.insertedCount });
});

module.exports = router;
