import express from 'express';
import Service from '../models/Service.js';
import { makeCrudController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();
const SERVICE_IMAGE_FIELDS = ['image', 'icon'];
const ctrl = makeCrudController(Service, { imageField: 'image', imageFields: SERVICE_IMAGE_FIELDS, searchable: ['title','shortDesc'] });
const uploadServiceImages = upload.fields(SERVICE_IMAGE_FIELDS.map((name) => ({ name, maxCount: 1 })));

// Public
router.get('/', ctrl.list);
router.get('/slug/:slug', ctrl.getBySlug);
router.get('/:id', ctrl.getOne);

// Admin (protected)
router.post('/', protect, uploadServiceImages, ctrl.create);
router.put('/:id', protect, uploadServiceImages, ctrl.update);
router.delete('/:id', protect, ctrl.remove);
router.patch('/reorder/bulk', protect, ctrl.reorder);

export default router;