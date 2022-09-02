const isString = (str) => typeof (str) === 'string';
const isNonEmptyString = (str) => isString(str) && Boolean(str);
const isValidDate = (date) => (new Date(date) !== 'Invalid Date') && !Number.isNaN(new Date(date));

const checkIsTrackObjectValid = (track) => {
  const {
    tags, event, url, title, ts,
  } = track;
  const isEventValid = isNonEmptyString(event);
  const isUrlValid = isNonEmptyString(url);
  const isTitleValid = isNonEmptyString(title);
  const areTagsValid = Array.isArray(tags) && tags.every((tag) => isString(tag));
  const isDateValid = isValidDate(ts);

  return isEventValid && isUrlValid && isTitleValid && areTagsValid && isDateValid;
};

module.exports = (req, res, next) => {
  const { tracks } = req.body;
  if (!tracks || tracks.length === 0) {
    return res.send({ errorMsg: 'Tracks object is empty' }).status(400);
  }

  const validTracks = tracks.filter(checkIsTrackObjectValid);
  if (validTracks.length) {
    res.locals.tracks = validTracks;
    return next();
  }
  return res.send({ errorMsg: 'Tracks array has invalid format' }).status(400);
};
