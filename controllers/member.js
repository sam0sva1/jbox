import Member from '../models/member.js';

export const list = async (req, res, next) => {
	res.send('list of members');
}

export const add = async (req, res, next) => {
	var memberInfo = req.body;
	console.log(memberInfo);

	try {
		var member = await Member.create(memberInfo);
	} catch (err) {
		console.log('err');
	}
	res.send('member added');
}