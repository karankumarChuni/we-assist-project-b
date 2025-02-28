import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true
    },
    itemType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ItemType',
      required: [true, 'Item type is required']
    },
    purchaseDate: {
      type: Date,
      required: [true, 'Purchase date is required']
    },
    stockAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;