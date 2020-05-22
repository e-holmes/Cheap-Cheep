const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.List
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllByUser: function (req, res) {
    db.List
      .find({ user : req.params.id})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.List
      .findById(req.params.id)
      .then(function (dbModel) {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.List
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.List
      .findOneAndUpdate({ _id: req.params.id }, { $push: { Items: req.body._id } }, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeItem: function (req, res) {
    db.List
      .findOneAndUpdate({ _id: req.params.id }, { $pull: { Items: req.body._id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.list
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};