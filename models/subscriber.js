import mongoose, { Schema } from 'mongoose';

const SubscriberSchema = new Schema({
	email: { type: String, require: true }
});

export default mongoose.model('Subscriber', SubscriberSchema);