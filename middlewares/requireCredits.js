module.exports = (req, res, next) => {
  // alter the conditions below for credit check
  if (req.user.credits < 1){
    return res.status(403).send({ error: 'You have insufficient credits!'})
  }

  next();
};
