import express from 'express';
import { 
  getAllItemTypes, 
  createItemType, 
  deleteItemType 
} from '../Controllers/itemTypeController.js';

const router = express.Router();

router.get('/', getAllItemTypes);
router.post('/', createItemType);
router.delete('/:id', deleteItemType);

export default router;