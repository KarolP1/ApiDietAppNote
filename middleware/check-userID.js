const JWT = require("jsonwebtoken");

module.exports = function (req, res, next) {
	JWT.verify(req.cookies["token"], "secret", function (err, decodedToken) {
		if (err) {
			/* handle token err */
			console.log(err);
		} else {
			console.log(decodedToken.id);
			req.userId = decodedToken.id; // Add to req object
			next();
		}
	});
};
