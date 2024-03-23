const bcrypt = require("bcrypt");
const adminRouter = require("express").Router();
const dbConn = require("../utils/db");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");

// https://stackoverflow.com/questions/46693430/what-are-salt-rounds-and-how-are-salts-stored-in-bcrypt
// TODO https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

adminRouter.post("/createuser", async (request, response) => {
  const administrator = req.administrator;

  if (!administrator) {
    return res.status(401).json({
      error: `You must be logged in as an administrator`,
    });
  }

  const { username, email, password } = request.body;

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "Username and password should each be at least 3 characters long",
    });
  }

  if (!validator.validate(email)) {
    return response.status(400).json({
      error: "Invalid email",
    });
  }

  try {
    const userWithUsername = await dbConn.query(
      "SELECT * FROM user WHERE username=?",
      [username]
    );

    if (userWithUsername.length !== 0) {
      return response.status(409).json({
        error: "A user with that username already exists",
      });
    }

    const userWithEmail = await dbConn.query(
      "SELECT * FROM user WHERE email=?",
      [email]
    );

    if (userWithEmail.length !== 0) {
      return response.status(409).json({
        error: "A user with that email already exists",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const query =
      "INSERT INTO user (username, email, password_hash) VALUES (?, ?, ?);";

    await dbConn.query(query, [username, email, passwordHash]);

    return response.status(201).end();
  } catch (err) {
    return response.status(500).end();
  }
});

adminRouter.post("/createstudent", async (request, response) => {
  const administrator = req.administrator;

  if (!administrator) {
    return res.status(401).json({
      error: `You must be logged in as an administrator`,
    });
  }

  const { username, email, password } = request.body;

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "Username and password should each be at least 3 characters long",
    });
  }

  if (!validator.validate(email)) {
    return response.status(400).json({
      error: "Invalid email",
    });
  }

  try {
    const userWithUsername = await dbConn.query(
      "SELECT * FROM user WHERE username=?",
      [username]
    );

    if (userWithUsername.length !== 0) {
      return response.status(409).json({
        error: "A user with that username already exists",
      });
    }

    const userWithEmail = await dbConn.query(
      "SELECT * FROM user WHERE email=?",
      [email]
    );

    if (userWithEmail.length !== 0) {
      return response.status(409).json({
        error: "A user with that email already exists",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const query =
      "INSERT INTO user (username, email, password_hash) VALUES (?, ?, ?);";

    await dbConn.query(query, [username, email, passwordHash]);

    return response.status(201).end();
  } catch (err) {
    return response.status(500).end();
  }
});


adminRouter.get("/users", async (request, response) => {
  const administrator = req.administrator;

  if (!administrator) {
    return res.status(401).json({
      error: `You must be logged in as an administrator`,
    });
  }

  const query = "SELECT username, email FROM user";
  try {
    const qres = await dbConn.query(query);
    response.json(qres);
  } catch (err) {
    return response.status(500).end();
  }
});

adminRouter.post("/", async (request, response) => {
  const administrator = req.administrator;

  if (!administrator) {
    return res.status(401).json({
      error: `You must be logged in as an administrator`,
    });
  }

  const { username, email, password, security_question, security_answer } =
    request.body;

  if (!username || username.length < 3 || !password || password.length < 3) {
    return response.status(400).json({
      error: "Username and password should each be at least 3 characters long",
    });
  }

  if (!validator.validate(email)) {
    return response.status(400).json({
      error: "Invalid email",
    });
  }

  if (!security_question || security_question.length < 10) {
    return response.status(400).json({
      error: "Security question should be at least 10 characters long",
    });
  }

  if (!security_answer || security_answer.length < 3) {
    return response.status(400).json({
      error:
        "The answer to the security question should be at least 3 characters long",
    });
  }

  try {
    const administratorWithUsername = await dbConn.query(
      "SELECT * FROM administrator WHERE username=?",
      [username]
    );

    if (administratorWithUsername.length !== 0) {
      return response.status(409).json({
        error: "An administrator with that username already exists",
      });
    }

    const administratorWithEmail = await dbConn.query(
      "SELECT * FROM administrator WHERE email=?",
      [email]
    );

    if (administratorWithEmail.length !== 0) {
      return response.status(409).json({
        error: "An administrator with that email already exists",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const securityAnswerHash = await bcrypt.hash(security_answer, saltRounds);

    const query =
      "INSERT INTO administrator (username, email, password_hash, security_question, security_answer_hash) VALUES (?, ?, ?, ?, ?)";

    await dbConn.query(query, [
      username,
      email,
      passwordHash,
      security_question,
      securityAnswerHash,
    ]);

    return response.status(201).end();
  } catch (err) {
    return response.status(500).end();
  }
});

adminRouter.get("/", async (request, response) => {
  const administrator = req.administrator;

  if (!administrator) {
    return res.status(401).json({
      error: `You must be logged in as an administrator`,
    });
  }

  const query = "SELECT username, email FROM administrator";
  try {
    const qres = await dbConn.query(query);
    response.json(qres);
  } catch (err) {
    return response.status(500).end();
  }
});

adminRouter.post("/login", async (request, response) => {
  const { username, password } = request.body;

  try {
    const query = "SELECT * FROM administrator WHERE username=?";

    const [administratorWithUsername] = await dbConn.query(query, [username]);

    if (!administratorWithUsername) {
      return response.status(401).json({
        error: "Invalid username",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      administratorWithUsername.password_hash
    );

    if (!passwordCorrect) {
      return response.status(401).json({
        error: "Invalid password",
      });
    }

    const administratorForToken = {
      username: administratorWithUsername.username,
      email: administratorWithUsername.email,
    };

    const token = jwt.sign(administratorForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    response.status(200).send({
      token,
      username: administratorWithUsername.username,
      email: administratorWithUsername.email,
      type: "administrator",
    });
  } catch (err) {
    return response.status(500).end();
  }
});

module.exports = adminRouter;
