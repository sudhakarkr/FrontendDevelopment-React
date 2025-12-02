import api from './api';
import type {
  Item,
  CreateItemRequest,
  UpdateItemRequest,
  PagedResponse,
  PaginationParams,
} from '../types';

const ITEMS_ENDPOINT = '/items';

export const itemService = {
  getAll: async (params?: PaginationParams): Promise<PagedResponse<Item>> => {
    const response = await api.get<PagedResponse<Item>>(ITEMS_ENDPOINT, { params });
    return response.data;
  },

  getById: async (id: string): Promise<Item> => {
    const response = await api.get<Item>(`${ITEMS_ENDPOINT}/${id}`);
    return response.data;
  },

  create: async (data: CreateItemRequest): Promise<Item> => {
    const response = await api.post<Item>(ITEMS_ENDPOINT, data);
    return response.data;
  },

  update: async (id: string, data: UpdateItemRequest): Promise<Item> => {
    const response = await api.put<Item>(`${ITEMS_ENDPOINT}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${ITEMS_ENDPOINT}/${id}`);
  },
};

export default itemService;
