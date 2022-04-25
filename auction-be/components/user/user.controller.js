const db = require('../../config');
var bcrypt = require('bcrypt');
var authenticateToken = require('./authenticateToken');
const generateJWT = require('./generateJWT.js');
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = async (req, res) => {
  if (!req.body.email) {
    res.status(400).send({
      message: 'email can not be empty!',
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: 'Password can not be empty!',
    });
    return;
  }

  const userExist = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (userExist) {
    return res.status(400).json({ error: 'Username already exist' });
  }
  // Create a User
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  //user.password = await bcrypt.hash(req.body.password, salt);
  const user = {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
  };
  // Save User in the database

  User.create(user)
    .then(async (data) => {
      const { error, token } = await generateJWT(user.name);


      if (error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't create access  token. Please try again later.",
        });
      }



      res.status(200).json({ id: data.id, token });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

exports.login = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({
    where: {
      email: body.email
    }
  });

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      const { error, token } = await generateJWT(user.name);


      if (error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't create access token. Please try again later.",
        });
      }

      res.status(200).json({ id: user.id, email: body.email, token });
    } else {
      res.status(400).json({ error: 'Invalid Password' });
    }
  } else {
    res.status(401).json({ error: 'User does not exist' });
  }
}

