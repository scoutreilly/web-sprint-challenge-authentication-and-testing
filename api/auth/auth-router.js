const router = require("express").Router();
const { makeToken } = require("../secrets");
const bcrypt = require("bcryptjs");
const { add, findBy } = require("./model");

const checkUsernameFree = async (req, res, next) => {
  try {
    const rows = await findBy({ username: req.body.username });
    if (!rows.length) {
      next();
    } else {
      res.status(422).json({ message: "username taken" });
    }
  } catch (e) {
    res.status(500).json({ message: `server error ${e}` });
  }
};

const checkPayload = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ message: "username and password required" });
  } else {
    next();
  }
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const rows = await findBy({ username: req.body.username });
    if (rows.length) {
      req.userData = rows[0];
      next();
    } else {
      res.status(422).json({ message: "invalid credentials" });
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

router.post(
  "/register",
  checkUsernameFree,
  checkPayload,
  async (req, res, next) => {
    res.end("implement register, please!");
    /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
    // try {
    //   const hash = bcrypt.hashSync(req.body.password, 2);
    //   const newUser = await add({
    //     username: req.body.username,
    //     password: hash,
    //   });
    //   res.status(200).json(newUser);
    // } catch (e) {
    //   next();
    // }
  }
);

router.post(
  "/login",
  checkUsernameExists,
  checkPayload,
  async (req, res, next) => {
    res.end("implement login, please!");
    /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
    // try {
    //   const verified = bcrypt.compareSync(
    //     req.body.password,
    //     req.userData.password
    //   );
    //   if (verified) {
    //     const token = makeToken(req.userData);
    //     res
    //       .status(200)
    //       .json({ message: `welcome ${req.body.username}!`, token });
    //   } else {
    //     res.status(401).json({ message: "invalid credentials" });
    //   }
    // } catch (e) {
    //   next();
    // }
  }
);

module.exports = router;
