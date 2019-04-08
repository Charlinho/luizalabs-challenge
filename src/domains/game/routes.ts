import express from 'express';

import controllers from './controller';

const router = express.Router();

router.get('/', controllers.index);

export default router;
