import Item from '../Models/Item.js';

// Get all items with populated item type
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('itemType', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create multiple items
export const createItems = async (req, res) => {
  try {
    const items = req.body;
    
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of items' });
    }
    
    // Validate each item
    for (const item of items) {
      if (!item.name || !item.itemType || !item.purchaseDate) {
        return res.status(400).json({ 
          message: 'Each item must have a name, item type, and purchase date' 
        });
      }
    }
    
    const createdItems = await Item.insertMany(items);
    
    // Populate the item type for the response
    const populatedItems = await Item.find({
      _id: { $in: createdItems.map(item => item._id) }
    }).populate('itemType', 'name');
    
    res.status(201).json(populatedItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, itemType, purchaseDate, stockAvailable } = req.body;
    
    if (!name || !itemType || !purchaseDate) {
      return res.status(400).json({ 
        message: 'Name, item type, and purchase date are required' 
      });
    }
    
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, itemType, purchaseDate, stockAvailable },
      { new: true, runValidators: true }
    ).populate('itemType', 'name');
    
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};