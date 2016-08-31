//exports middleware

var middleware = {
	logger: function (req, res, next) {
		var date = new Date().toString();
		console.log('\n*******************************');
		console.log('NEW REQUEST')
		console.log('Request: ' + req.method + ' ' + req.originalUrl);
		console.log('At: ' + date);
		console.log('*******************************\n');

		next();
	}
};

module.exports = middleware;