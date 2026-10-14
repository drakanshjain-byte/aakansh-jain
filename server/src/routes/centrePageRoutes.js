import express from 'express';
import CentrePage from '../models/CentrePage.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(CentrePage);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;