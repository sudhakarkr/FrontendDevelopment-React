import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

import authReducer, {
  login,
  register,
  logout,
  clearError,
} from '../../features/auth/authSlice';
import type { AuthState } from '../../types';

describe('authSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: { auth: authReducer },
    });
    localStorage.clear();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().auth as AuthState;
      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('login', () => {
    it('should set loading state when login is pending', () => {
      store.dispatch({ type: login.pending.type });
      const state = store.getState().auth as AuthState;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set authenticated state when login is fulfilled', () => {
      const payload = {
        accessToken: 'test-token',
        refreshToken: 'test-refresh',
        tokenType: 'Bearer',
        expiresIn: 3600,
      };

      store.dispatch({ type: login.fulfilled.type, payload });
      const state = store.getState().auth as AuthState;

      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.accessToken).toBe('test-token');
      expect(state.refreshToken).toBe('test-refresh');
    });

    it('should set error state when login is rejected', () => {
      store.dispatch({
        type: login.rejected.type,
        payload: 'Invalid credentials',
      });
      const state = store.getState().auth as AuthState;

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should set loading state when register is pending', () => {
      store.dispatch({ type: register.pending.type });
      const state = store.getState().auth as AuthState;
      expect(state.isLoading).toBe(true);
    });

    it('should clear loading when register is fulfilled', () => {
      store.dispatch({ type: register.fulfilled.type });
      const state = store.getState().auth as AuthState;
      expect(state.isLoading).toBe(false);
    });

    it('should set error when register is rejected', () => {
      store.dispatch({
        type: register.rejected.type,
        payload: 'User already exists',
      });
      const state = store.getState().auth as AuthState;

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('User already exists');
    });
  });

  describe('logout', () => {
    it('should clear auth state', () => {
      // First login
      store.dispatch({
        type: login.fulfilled.type,
        payload: {
          accessToken: 'test-token',
          refreshToken: 'test-refresh',
          tokenType: 'Bearer',
          expiresIn: 3600,
        },
      });

      // Then logout
      store.dispatch(logout());
      const state = store.getState().auth as AuthState;

      expect(state.user).toBeNull();
      expect(state.accessToken).toBeNull();
      expect(state.refreshToken).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      store.dispatch({
        type: login.rejected.type,
        payload: 'Some error',
      });

      store.dispatch(clearError());
      const state = store.getState().auth as AuthState;

      expect(state.error).toBeNull();
    });
  });
});
