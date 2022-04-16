const jwt = require('jsonwebtoken');

const generateJWT = (uid = "") => {
    return new Promise((resolve, reject) => {
      const payload = { uid };
      jwt.sign(
        payload,
        process.env.PRIVATE_JWT,
        {
          expiresIn: "2 days",
        },
        (err, token) => {
          if (err) {
            reject("cannot generate token");
          } else {
            resolve(token);
          }
        }
      );
    });
};


module.exports = {
    generateJWT
}

