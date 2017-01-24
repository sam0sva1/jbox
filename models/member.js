import mongoose, { Schema } from 'mongoose';

const MemberSchema = new Schema({
	name: { type: String, require: true },
	email: { type: String, require: true },
	phone: { type: String, require: true },
	description: { type: String, require: true },
	createAt: { type: Date, require: true, default: Date.now },
	memberId: { type: mongoose.Schema.Types.ObjectId }
});

export default mongoose.model('Member', MemberSchema);