import express from 'express';

import * as MemberController from '../controllers/member.js';

const router = new express.Router();

router.get('/list', MemberController.list);
router.post('/add', MemberController.add);

export default router;