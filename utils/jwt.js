const jwt = require("jsonwebtoken");
const RequestResponse = require("./common");
// sign
async function sign(obj) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      obj,
      "aabbccddeeffgghhiijjkkllmmnnoopp",
      {
        expiresIn: "2 hours"
      },
      (error, token) => {
        if (error) {
          return reject({ error: "Create token failed" });
        }
        resolve(token);
      }
    );
  });
}
// verify
async function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "aabbccddeeffgghhiijjkkllmmnnoopp", (error, obj) => {
      if (error) {
        return reject({ error: "Verify token failed" });
      }
      delete obj.iat;
      delete obj.exp;
      resolve(obj);
    });
  });
}

module.exports = {
  sign,
  verify
};
