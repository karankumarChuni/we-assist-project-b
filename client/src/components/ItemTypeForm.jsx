import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getItemTypes,
  createItemType,
  deleteItemType,
  reset,
} from "../redux/slices/itemTypeSlice";
import { Trash2, Plus, Loader } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemTypeForm = () => {
  const dispatch = useDispatch();
  const { itemTypes, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.itemTypes
  );
  const [name, setName] = useState("");
  const [actionTriggered, setActionTriggered] = useState(false); // Track action

  useEffect(() => {
    dispatch(getItemTypes());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (actionTriggered) {
      // Only show toast if an action was triggered (not on delete)
      if (isSuccess) {
        toast.success("Item type added successfully!");
        setName("");
      }

      if (isError) {
        toast.error(message || "An error occurred.");
      }

      setActionTriggered(false); // Reset local state after showing toast
      dispatch(reset()); // Reset Redux state to prevent re-triggering
    }
  }, [isSuccess, isError, message, dispatch, actionTriggered]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warning("Please enter a type name.");
      return;
    }

    setActionTriggered(true); // Track form submission action
    dispatch(createItemType({ name }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item type?")) {
      dispatch(deleteItemType(id))
        .unwrap()
        .then(() => {
          toast.success("Item type deleted successfully!"); // Toast only here for delete
        })
        .catch(() => {
          toast.error("Failed to delete item type.");
        });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="card">
        <h2>Add Item Type</h2>
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
          <ul className="mt-4 ">
            {itemTypes.map((type) => (
              <li
                key={type._id}
                className="flex item-type-icon justify-between items-center p-2 border-b "
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
