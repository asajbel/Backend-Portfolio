var mailer = require("nodemailer");
var request = require('request');
require('dotenv').config();

var reCaptchaKey = process.env.RECAPTCHA_SECRET;
var verifyURL = "https://www.google.com/recaptcha/api/siteverify";

module.exports = function(app) {
  var transporter = mailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "asajbel.portfolio@gmail.com",
      pass: process.env.EMAIL_PASS
    }
  });

  app.post("/contact", function(req, res) {
    console.log(JSON.stringify(req.body, null, 2));
    var remoteIP = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);

    console.log("IP Address:", remoteIP);

    request({
      uri: "https://www.google.com/recaptcha/api/siteverify",
      method: "POST",
      form: {
        remoteip: remoteIP,
        secret: reCaptchaKey,
        response: req.body['g-recaptcha-response']
      }
    }, function(error, response, body) {
      console.log("Body:", body);
      console.log("Error:", error);
      body = JSON.parse(body);
      if (error) {
        res.render("contact", {
          title: "Contact",
          contact: true,
          error: "An error has been encountered sending your message. Contact asajbel.portfolio@gmail.com for help."
        });
      }
      if (body.success) {
        var mailOptions = {
          from: {
            name: req.body.name + "  " + req.body.email,
            address: req.body.email
          },
          replyTo: req.body.email,
          sender: req.body.email, // sender address
          to: 'serdan66@gmail.com', // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.text, // plain text body
        };
        console.log(mailOptions);
        transporter.sendMail(mailOptions, function(mailErr, info) {
          if (mailErr) {
            console.log(mailErr);
            res.render("contact", {
              title: "Contact",
              contact: true,
              error: "An error has been encountered sending your message. Contact asajbel.portfolio@gmail.com for help."
            });
          } else {
            console.log('Message sent: %s', info.messageId);
            res.render("contact", {
              title: "Contact",
              contact: true,
              success: "Your message has been sent. I'll get back to you as soon as I can."
            });
          }
        });
      } else {
        res.render("contact", {
          title: "Contact",
          contact: true,
          error: "An error has been encountered sending your message. I think you're a bot."
        });
      }
    });

  });

  app.post("/email", function(req, res) {
    console.log(req.body);
    var mailOptions = {
      from: {
        name: req.body.name + "  " + req.body.email,
        address: req.body.email
      },
      replyTo: req.body.email,
      sender: req.body.email, // sender address
      to: 'serdan66@gmail.com', // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.text, // plain text body
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        res.render("contact", {
          title: "Contact",
          contact: true,
          error: "An error has been encountered sending your message. Contact asajbel.portfolio@gmail.com for help."
        }).end();
      } else {
        console.log('Message sent: %s', info.messageId);
        res.render("contact", {
          title: "Contact",
          contact: true,
          success: "Your message has been sent. I'll get back to you as soon as I can."
        }).end();
      }
    });
  });
}