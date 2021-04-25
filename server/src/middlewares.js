const notFound = (req, res, next) => {
	const error = new Error(`Not Found -${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (error, req, res, next) => {
	//error handling middleware, must have 4 paras

	const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // if the status code was passed from the previous middleware,set the code to the variable
	res.status(statusCode);
	res.json({
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? 'nothing' : error.stack, //dont do this in production since ppl can see your folder etc..
	});
};

module.exports = {
	notFound,
	errorHandler,
};
