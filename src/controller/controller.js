const { blog1, blog2 } = require("../model/schema");
const HTTP = require("../../constant/response.constant");

var session;

class class1 {
  static a = async (req, res) => {
    try {
      res.render("index");
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static b = async (req, res) => {
    try {
      res.render("login");
    } catch (err) {
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: err,
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static c = async (req, res) => {
    try {
      if (req.body.PhoneNumber && req.body.username && req.body.password) {
        var a = await blog2.find({ username: req.body.username });
        if (a.length == 1) {
          if (
            a[0].username == req.body.username &&
            a[0].password == req.body.password
          ) {
            session = req.session;
            session.token = req.body.PhoneNumber;
            var b = await blog1.find({ PhoneNumber: req.body.PhoneNumber });
            if (b.length == 0) {
              let data = new blog1({
                PhoneNumber: req.body.PhoneNumber,
                Spin: 10, // Whener User First time Sign Then We Are Give 10 Spin By Default
                Coin: 0,
                Transaction: [],
              });
              await data.save();
              res.send(data);
            } else {
              res.send(b[0]);
            }
          } else {
            res.send("Wrong Credential");
          }
        } else {
          res.send("Wrong Credential");
        }
      } else {
        res.send(" Insufficient Data ");
      }
    } catch (err) {
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: err,
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static d = async (req, res) => {
    try {
      res.render("deposit");
    } catch (err) {}
  };
  static e = async (req, res) => {
    try {
      if (req.session.token) {
        var a = req.body.Rupees * 15;
        var b = await blog1.find({ PhoneNumber: req.session.token });
        b[0].Spin = b[0].Spin + a;
        b[0].save();
        b[0].Transaction.push(parseInt(req.body.Rupees));
        res.send(b);
      } else {
        return res.status(HTTP.SUCCESS).send({
          message: "session expired",
        });
      }
    } catch (err) {}
  };
  static f = async (req, res) => {
    try {
      res.render("change");
    } catch (err) {}
  };
  static g = async (req, res) => {
    try {
      if (req.session.token) {
        var b = await blog1.find({ PhoneNumber: req.session.token });
        b[0].Spin = b[0].Spin - 1;
        b[0].Coin = b[0].Coin + parseInt(req.body.Coin);
        b[0].save();
        res.send(b);
      } else {
        return res.status(HTTP.SUCCESS).send({
          message: "session expired",
        });
      }
    } catch (err) {}
  };
  static h = async (req, res) => {
    try {
      res.render("Withdrawal");
    } catch (err) {}
  };
  static i = async (req, res) => {
    try {
      if (req.session.token) {
        var a = req.body.Rupees * 20;
        var b = await blog1.find({ PhoneNumber: req.session.token });
        if (b[0].Coin > a) {
          b[0].Coin = b[0].Coin - a;
          b[0].Transaction.push(-req.body.Rupees);
          b[0].save();
          res.send(b);
        } else {
          return res.status(HTTP.SUCCESS).send({
            message: "Sufficient Coin",
          });
        }
      } else {
        return res.status(HTTP.SUCCESS).send({
          message: "session expired",
        });
      }
    } catch (err) {}
  };
}

module.exports = { class1 };
