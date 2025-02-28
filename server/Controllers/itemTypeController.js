import ItemType from '../Models/ItemType.js';

// Get all item types
export const getAllItemTypes = async (req, res) => {
  try {
    const itemTypes = await ItemType.find().sort({ name: 1 });
    res.status(200).json(itemTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new item type
export const createItemType = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Item type name is required' });
    }
    
    const existingItemType = await ItemType.findOne({ name });
    if (existingItemType) {
      return res.status(400).json({ message: 'Item type already exists' });
    }
    
    const newItemType = await ItemType.create({ name });
    res.status(201).json(newItemType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an item type
export const deleteItemType = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItemType = await ItemType.findByIdAndDelete(id);
    
    if (!deletedItemType) {
      return res.status(404).json({ message: 'Item type not found' });
    }
    
    res.status(200).json({ message: 'Item type deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};