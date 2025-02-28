import express from 'express';
import { 
  getAllItems, 
  createItems, 
  updateItem, 
  deleteItem 
} from '../Controllers/itemController.js';

const router = express.Router();

router.get('/', getAllItems);
router.post('/', createItems);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;