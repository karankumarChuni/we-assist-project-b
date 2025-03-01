import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = 'http://localhost:5000/api/items';
// const API_URL = `${import.meta.env.VITE_API_URL}/items`;
const API_URL = `${import.meta.env.VITE_API_URL}/items`;

// Get all items
export const getItems = createAsyncThunk(
  "items/getItems",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create multiple items
export const createItems = createAsyncThunk(
  "items/createItems",
  async (itemsData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, itemsData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update an item
export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (itemData, thunkAPI) => {
    try {
      const { _id, ...rest } = itemData;
      const response = await axios.put(`${API_URL}/${_id}`, rest);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete an item
export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all items
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create items
      .addCase(createItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = [...state.items, ...action.payload];
      })
      .addCase(createItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update item
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete item
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
