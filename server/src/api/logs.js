const { Router } = require('express');

const LogEntry = require('../models/LogEntry'); //import the template from LogEntry mongoose schema

const router = Router();

router.get('/', async (req, res, next) => {
	//因为在index.js文件里规定了但凡调用logs.js时候的默认路径为/api/logs,所以这边默认的 "/"实际上在浏览器里是 /api/logs
	try {
		const entries = await LogEntry.find();
		res.json(entries);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		// if (req.get('X-API-KEY') !== API_KEY) {
		// 	res.status(401);
		// 	throw new Error('Unauthorized');
		// }
		const logEntry = new LogEntry(req.body);
		const createdEntry = await logEntry.save();
		res.json(createdEntry);
	} catch (error) {
		if (error.name === 'ValidationError') {
			res.status(422);
		}
		next(error);
	}
});
module.exports = router;
