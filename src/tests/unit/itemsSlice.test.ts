import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

import itemsReducer, {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  clearError,
  clearSelectedItem,
} from '../../features/items/itemsSlice';
import type { ItemsState, Item } from '../../types';

type TestRootState = { items: ItemsState };

describe('itemsSlice', () => {
  let store: EnhancedStore<TestRootState>;

  beforeEach(() => {
    store = configureStore({
      reducer: { items: itemsReducer },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().items as ItemsState;
      expect(state.items).toEqual([]);
      expect(state.selectedItem).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('fetchItems', () => {
    it('should set loading when pending', () => {
      store.dispatch({ type: fetchItems.pending.type });
      const state = store.getState().items as ItemsState;
      expect(state.isLoading).toBe(true);
    });

    it('should set items when fulfilled', () => {
      const mockItems: Item[] = [
        {
          id: '1',
          name: 'Item 1',
          status: 'ACTIVE',
          createdAt: '2024-01-01',
        },
      ];

      store.dispatch({
        type: fetchItems.fulfilled.type,
        payload: {
          content: mockItems,
          page: 0,
          size: 20,
          totalElements: 1,
          totalPages: 1,
        },
      });

      const state = store.getState().items as ItemsState;
      expect(state.items).toEqual(mockItems);
      expect(state.isLoading).toBe(false);
    });

    it('should set error when rejected', () => {
      store.dispatch({
        type: fetchItems.rejected.type,
        payload: 'Failed to fetch',
      });

      const state = store.getState().items as ItemsState;
      expect(state.error).toBe('Failed to fetch');
      expect(state.isLoading).toBe(false);
    });
  });

  describe('createItem', () => {
    it('should add item to list when fulfilled', () => {
      const newItem: Item = {
        id: '1',
        name: 'New Item',
        status: 'ACTIVE',
        createdAt: '2024-01-01',
      };

      store.dispatch({
        type: createItem.fulfilled.type,
        payload: newItem,
      });

      const state = store.getState().items as ItemsState;
      expect(state.items).toContainEqual(newItem);
    });
  });

  describe('updateItem', () => {
    it('should update item in list when fulfilled', () => {
      // First add an item
      const item: Item = {
        id: '1',
        name: 'Original',
        status: 'ACTIVE',
        createdAt: '2024-01-01',
      };
      store.dispatch({
        type: createItem.fulfilled.type,
        payload: item,
      });

      // Then update it
      const updatedItem: Item = {
        ...item,
        name: 'Updated',
      };
      store.dispatch({
        type: updateItem.fulfilled.type,
        payload: updatedItem,
      });

      const state = store.getState().items as ItemsState;
      expect(state.items.find((i) => i.id === '1')?.name).toBe('Updated');
    });
  });

  describe('deleteItem', () => {
    it('should remove item from list when fulfilled', () => {
      // First add an item
      const item: Item = {
        id: '1',
        name: 'To Delete',
        status: 'ACTIVE',
        createdAt: '2024-01-01',
      };
      store.dispatch({
        type: createItem.fulfilled.type,
        payload: item,
      });

      // Then delete it
      store.dispatch({
        type: deleteItem.fulfilled.type,
        payload: '1',
      });

      const state = store.getState().items as ItemsState;
      expect(state.items.find((i) => i.id === '1')).toBeUndefined();
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      store.dispatch({
        type: fetchItems.rejected.type,
        payload: 'Some error',
      });

      store.dispatch(clearError());
      const state = store.getState().items as ItemsState;
      expect(state.error).toBeNull();
    });
  });

  describe('clearSelectedItem', () => {
    it('should clear selected item', () => {
      const item: Item = {
        id: '1',
        name: 'Selected',
        status: 'ACTIVE',
        createdAt: '2024-01-01',
      };
      store.dispatch({
        type: 'items/fetchById/fulfilled',
        payload: item,
      });

      store.dispatch(clearSelectedItem());
      const state = store.getState().items as ItemsState;
      expect(state.selectedItem).toBeNull();
    });
  });
});
