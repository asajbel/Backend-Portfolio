module.exports = function(app) {
	app.get("/", function(req, res) {
		res.render("index", {
			title: "About Me",
			home: true
		});
	});

	app.get("/contact", function(req, res) {
		res.render("contact", {
			title: "Contact",
			contact: true
		});
	});

	app.get("/portfolio", function(req, res) {
		res.render("portfolio", {
			title: "Portfolio",
			portfolio: true
		});
	});
}