import Subscriber from '../models/subscriber.js';

export const list = async (req, res, next) => {
	res.send('list of subscribers');
}

export const add = async (req, res, next) => {
	var subscriberInfo = req.body;
	console.log(subscriberInfo);

	try {
		var subscriber = await Subscriber.create(subscriberInfo);
	} catch (err) {
		console.log('err');
	}
	res.send('subscribers added');
}