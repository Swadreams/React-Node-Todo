const { verify } = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  let token = req.get('authorisation');
  console.log('token :', token);
  if (token) {
    verify(token, 'secretValue', (err, decoded) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: 'Session is expired',
          code: 'ERR401',
        });
      } else {
        console.log('token validation done', decoded);
        req.headers.email = decoded.email;
        next();
      }
    });
  } else {
    res.status(400).send({
      success: false,
      message: 'Access denied! Unauthorised user',
    });
  }
};
