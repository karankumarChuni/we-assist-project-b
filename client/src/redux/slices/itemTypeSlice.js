import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/itemTypes';

// Get all item types
export const getItemTypes = createAsyncThunk('itemTypes/getItemTypes', async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Create a new item type
export const createItemType = createAsyncThunk('itemTypes/createItemType', async (typeData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, typeData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete an item type
export const deleteItemType = createAsyncThunk('itemTypes/deleteItemType', async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  itemTypes: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

const itemTypeSlice = createSlice({
  name: 'itemTypes',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all item types
      .addCase(getItemTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItemTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.itemTypes = action.payload;
      })
      .addCase(getItemTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create item type
      .addCase(createItemType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItemType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.itemTypes.push(action.payload);
      })
      .addCase(createItemType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete item type
      .addCase(deleteItemType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.itemTypes = state.itemTypes.filter((type) => type._id !== action.payload);
      })
      .addCase(deleteItemType.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = itemTypeSlice.actions;
export default itemTypeSlice.reducer;