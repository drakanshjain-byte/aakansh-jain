import express from 'express';
import ConsultationSection from '../models/ConsultationSection.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(ConsultationSection);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;