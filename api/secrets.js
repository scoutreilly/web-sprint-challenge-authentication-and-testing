const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "thepinkranger";

const makeToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return JWT.sign(payload, JWT_SECRET, options);
};

module.exports = {
  makeToken,
  JWT_SECRET,
};
