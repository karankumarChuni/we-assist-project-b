import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  deleteItem,
  updateItem,
  reset,
} from "../redux/slices/itemSlice";
import { getItemTypes } from "../redux/slices/itemTypeSlice";
import { Trash2, Edit, X, Check, Loader } from "lucide-react";

const ItemList = () => {
  const dispatch = useDispatch();
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.items
  );
  const { itemTypes } = useSelector((state) => state.itemTypes);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    itemType: "",
    purchaseDate: "",
    stockAvailable: false,
  });

  useEffect(() => {
    dispatch(getItems());
    dispatch(getItemTypes());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteItem(id));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item._id);
    setFormData({
      name: item.name,
      itemType: item.itemType._id,
      purchaseDate: new Date(item.purchaseDate).toISOString().split("T")[0],
      stockAvailable: item.stockAvailable,
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = (id) => {
    dispatch(
      updateItem({
        _id: id,
        ...formData,
      })
    );
    setEditingItem(null);
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: "300px" }}
      >
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (isError) {
    return <div className="alert alert-danger">{message}</div>;
  }

  return (
    <div className="card">
      <h2>Inventory Items</h2>
      {items.length === 0 ? (
        <p className="mt-4">No items found. Please add some items.</p>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Type</th>
                <th>Purchase Date</th>
                <th>Stock Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  {editingItem === item._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <select
                          name="itemType"
                          value={formData.itemType}
                          onChange={handleChange}
                          className="form-control"
                        >
                          {itemTypes.map((type) => (
                            <option key={type._id} value={type._id}>
                              {type.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="date"
                          name="purchaseDate"
                          value={formData.purchaseDate}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <div className="checkbox-container">
                          <input
                            type="checkbox"
                            name="stockAvailable"
                            checked={formData.stockAvailable}
                            onChange={handleChange}
                          />
                        </div>
                      </td>
                      <td className="actions">
                        <button
                          onClick={() => handleUpdate(item._id)}
                          className="btn btn-success"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="btn btn-danger"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item.name}</td>
                      <td>{item.itemType?.name}</td>
                      <td>
                        {new Date(item.purchaseDate).toLocaleDateString()}
                      </td>
                      <td>{item.stockAvailable ? "Yes" : "No"}</td>
                      <td className="actions">
                        <button
                          onClick={() => handleEdit(item)}
                          className="btn btn-warning"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-danger"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemList;
