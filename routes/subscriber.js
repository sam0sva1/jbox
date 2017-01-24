import express from 'express';

import * as SubscribeController from '../controllers/subscriber.js';

const router = new express.Router();

router.get('/list', SubscribeController.list);
router.post('/add', SubscribeController.add);

export default router;