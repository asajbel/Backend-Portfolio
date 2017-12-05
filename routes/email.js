var mailer = require("nodemailer");

module.exports = function(app) {
	var transporter = mailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "asajbel.portfolio@gmail.com",
        pass: "Aj0gZWQCA6AH8m0e"
    }
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