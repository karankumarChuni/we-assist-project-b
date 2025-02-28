import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createItems, reset } from "../redux/slices/itemSlice";
import { getItemTypes } from "../redux/slices/itemTypeSlice";
import { Plus, Trash2, Save, Loader } from "lucide-react";

const ItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useSelector((state) => state.items);
  const { itemTypes } = useSelector((state) => state.itemTypes);

  const [items, setItems] = useState([
    {
      name: "",
      itemType: "",
      purchaseDate: "",
      stockAvailable: true,
    },
  ]);

  useEffect(() => {
    dispatch(getItemTypes());

    if (isSuccess) {
      dispatch(reset());
      // navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess, navigate]);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [name]: type === "checkbox" ? checked : value,
    };
    setItems(newItems);
  };

  const addItemRow = () => {
    setItems([
      ...items,
      {
        name: "",
        itemType: "",
        purchaseDate: "",
        stockAvailable: true,
      },
    ]);
  };

  const removeItemRow = (index) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all items
    const isValid = items.every(
      (item) => item.name && item.itemType && item.purchaseDate
    );

    if (!isValid) {
      alert("Please fill in all required fields for each item");
      return;
    }

    dispatch(createItems(items));
  };

  if (itemTypes.length === 0) {
    return (
      <div className="card">
        <h2>Add Items</h2>
        <div className="alert alert-warning mt-4">
          <p>No item types available. Please add some item types first.</p>
          <button
            className="btn btn-warning mt-4"
            onClick={() => navigate("/types")}
          >
            Add Item Types
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Add Multiple Items</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="form-group">
              <label htmlFor={`name-${index}`}>Item Name *</label>
              <input
                type="text"
                id={`name-${index}`}
                name="name"
                value={item.name}
                onChange={(e) => handleChange(index, e)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor={`itemType-${index}`}>Item Type *</label>
              <select
                id={`itemType-${index}`}
                name="itemType"
                value={item.itemType}
                onChange={(e) => handleChange(index, e)}
                className="form-control"
                required
              >
                <option value="">Select Type</option>
                {itemTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor={`purchaseDate-${index}`}>Purchase Date *</label>
              <input
                type="date"
                id={`purchaseDate-${index}`}
                name="purchaseDate"
                value={item.purchaseDate}
                onChange={(e) => handleChange(index, e)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label
                htmlFor={`stockAvailable-${index}`}
                className="checkbox-container"
              >
                <input
                  type="checkbox"
                  id={`stockAvailable-${index}`}
                  name="stockAvailable"
                  checked={item.stockAvailable}
                  onChange={(e) => handleChange(index, e)}
                />
                In Stock
              </label>
            </div>

            <button
              type="button"
              onClick={() => removeItemRow(index)}
              className="btn btn-danger"
              disabled={items.length === 1}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <button type="button" onClick={addItemRow} className="btn add-item-btn">
          <Plus size={16} /> Add Another Item
        </button>

        <div className="submit-container">
          <button
            type="submit"
            className="btn btn-success"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={16} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Save All Items
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
