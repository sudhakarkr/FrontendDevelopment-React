import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import itemService from '../../services/itemService';
import type {
  ItemsState,
  Item,
  CreateItemRequest,
  UpdateItemRequest,
  PaginationParams,
  PagedResponse,
} from '../../types';

const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  pagination: {
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchItems = createAsyncThunk<
  PagedResponse<Item>,
  PaginationParams | undefined,
  { rejectValue: string }
>('items/fetchAll', async (params, { rejectWithValue }) => {
  try {
    return await itemService.getAll(params);
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch items');
  }
});

export const fetchItemById = createAsyncThunk<
  Item,
  string,
  { rejectValue: string }
>('items/fetchById', async (id, { rejectWithValue }) => {
  try {
    return await itemService.getById(id);
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch item');
  }
});

export const createItem = createAsyncThunk<
  Item,
  CreateItemRequest,
  { rejectValue: string }
>('items/create', async (data, { rejectWithValue }) => {
  try {
    return await itemService.create(data);
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || 'Failed to create item');
  }
});

export const updateItem = createAsyncThunk<
  Item,
  { id: string; data: UpdateItemRequest },
  { rejectValue: string }
>('items/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    return await itemService.update(id, data);
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || 'Failed to update item');
  }
});

export const deleteItem = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('items/delete', async (id, { rejectWithValue }) => {
  try {
    await itemService.delete(id);
    return id;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(err.response?.data?.message || 'Failed to delete item');
  }
});

// Slice
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.content;
        state.pagination = {
          page: action.payload.page,
          size: action.payload.size,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch items';
      })
      // Fetch by ID
      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch item';
      })
      // Create
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
        state.pagination.totalElements += 1;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to create item';
      })
      // Update
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedItem?.id === action.payload.id) {
          state.selectedItem = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update item';
      })
      // Delete
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.pagination.totalElements -= 1;
        if (state.selectedItem?.id === action.payload) {
          state.selectedItem = null;
        }
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete item';
      });
  },
});

export const { clearSelectedItem, clearError, setPage } = itemsSlice.actions;
export default itemsSlice.reducer;
