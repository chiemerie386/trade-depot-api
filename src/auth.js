const jwt = require('jsonwebtoken')

const verifyToken = async (
  req,
  res,
  next
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.body.token;

    if (!token) {
      return res
        .status(403)
        .json({ error: 'A token is required for authentication' });
    }

    if (token) {
      const decodedData = jwt.verify(token, process.env.BCRYPT_SECRET_KEY);
      if (new Date().getTime() < decodedData.exp) {
        return res
          .status(401)
          .json({ error: 'Token has expired, reauthenticate again' });
      }


      req.userId = decodedData.id;
      req.email = decodedData.email;
    }
    return next();
  } catch (e) {
    return res.status(500).send({ error: e });
  }
};

module.exports = verifyToken;
