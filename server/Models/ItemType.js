import mongoose from 'mongoose';

const itemTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item type name is required'],
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const ItemType = mongoose.model('ItemType', itemTypeSchema);

export default ItemType;