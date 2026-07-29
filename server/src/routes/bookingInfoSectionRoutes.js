import express from 'express';
import BookingInfoSection from '../models/BookingInfoSection.js';
import { makeSingletonController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
const ctrl = makeSingletonController(BookingInfoSection);

router.get('/', ctrl.get);
router.put('/', protect, ctrl.update);

export default router;