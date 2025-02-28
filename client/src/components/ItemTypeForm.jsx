import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getItemTypes,
  createItemType,
  deleteItemType,
  reset,
} from "../redux/slices/itemTypeSlice";
import { Trash2, Plus, Loader } from "lucide-react";

const ItemTypeForm = () => {
  const dispatch = useDispatch();
  const { itemTypes, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.itemTypes
  );
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getItemTypes());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setName("");
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a type name");
      return;
    }

    dispatch(createItemType({ name }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item type?")) {
      dispatch(deleteItemType(id));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="card">
        <h2>Add Item Type</h2>
        {isError && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <label htmlFor="name">Type Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Enter item type name"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader size={16} className="animate-spin" /> Adding...
              </>
            ) : (
              <>
                <Plus size={16} /> Add Type
              </>
            )}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Item Types</h2>
        {itemTypes.length === 0 ? (
          <p className="mt-4">No item types found. Please add some.</p>
        ) : (
          <ul className="mt-4">
            {itemTypes.map((type) => (
              <li
                key={type._id}
                className="flex justify-between items-center p-2 border-b"
              >
                <span>{type.name}</span>
                <button
                  onClick={() => handleDelete(type._id)}
                  className="btn btn-danger"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItemTypeForm;
