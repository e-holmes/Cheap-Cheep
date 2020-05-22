const db = require("../models");

// Defining methods for the userController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  login: function (req, res) {
    db.User
      .findOne({ userName: req.body.userName })
      .then(function (dbResult) {
        var userData = {
          found: true,
          userID: -1
        }

        //here we catch if the username and password both match the request. We return the userID.
        if (!dbResult.userName) {
          userData.found = false;

          //here we test the username and password. If they match, we add the user's id to the response.
        } else if (dbResult.userName === req.body.userName && dbResult.password === req.body.password) {
          userData.userID = dbResult._id;
        }
        // userdata goes back regardless. If neither of the above cases applies, 
        // it means we found the user but the password was wrong.
        res.json(userData);
      })
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
