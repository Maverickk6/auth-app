const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const bodyParser = require("body-parser");
// const bcrypt = require('bcrypt-nodejs');
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(cors());

const sqDatabase = new sqlite3.Database("./my.db");

const createUsersTable = () => {
  const sqlQuery = `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text,
        email text UNIQUE,
        password text)`;

  return sqDatabase.run(sqlQuery);
};

const findUserByEmail = (email, cb) => {
  return sqDatabase.get(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    (err, row) => {
      cb(err, row);
    }
  );
};

const createUser = (user, cb) => {
  return sqDatabase.run(
    "INSERT INTO users (name, email, password) VALUES (?,?,?)",
    user,
    (err) => {
      cb(err);
    }
  );
};

createUsersTable();

const jwt = require("jsonwebtoken");
const accessTokenSecret = "jwtSecret";

const bcrypt = require("bcryptjs");

// const database = {
//   users: [
//     {
//       id: "123",
//       name: "John",
//       email: "john@gmail.com",
//       password: "cookies",
//     },
//     {
//       id: "124",
//       name: "Sally",
//       email: "sally@gmail.com",
//       password: "bananas",
//     },
//   ],
//   login: [
//     {
//       id: "987",
//       hash: "",
//       email: "john@gmail.com",
//     },
//   ],
// };

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, accessTokenSecret, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }

//       req.user = user;
//       console.log(user);
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };

app.get("/api", (req, res) => {
  //res.send(database.users)
  res.send("<h1>Hello </h1>");
});

app.post("/login", (req, res) => {
 // const { email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  findUserByEmail(email, (err, user) => {
    if (err) return res.stats(500).send("Server error");
    if (!user) return res.status(404).send("User not found");
    const result = bcrypt.compareSync(password, user.password);
    if (!result) return res.status(401).send("Password is not valid");

    const accessToken = jwt.sign({ id: user.id }, accessTokenSecret, {
      expiresIn: 300,
    });
    res.status(200).send({ user: user, "access-token": accessToken });
  });
  //   const user = database.users.find((u) => {
  //     return u.email === email && u.password === password;
  //   });
  //   if (user) {
  //     const accessToken = jwt.sign(
  //       { email: user.email, password: user.password },
  //       accessTokenSecret
  //     );

  //     res.status(200).send({ auth: true, token: accessToken });
  //     console.log(accessToken);
  //   } else {
  //     res.status(400).json("error logging in. Username or password is incorrect");
  //   }
});

app.post("/register", (req, res) => {
  const { email, name } = req.body;
  const password = bcrypt.hashSync(req.body.password);

  createUser([name, email, password], (err) => {
    if (err) return res.status(500).send("Server error");
    findUserByEmail(email, (err, user) => {
      if (err) return res.status(500).send("Server error");
      const expiresIn = 300;
      const accessToken = jwt.sign({ id: user.id }, accessTokenSecret, {
        expiresIn: expiresIn,
      });
      res.status(200).send({ user: user, "access-token": accessToken });
    });
  });
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});
