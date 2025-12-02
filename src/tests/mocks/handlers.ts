import { http, HttpResponse } from 'msw';

const baseUrl = '/api/v1';

// Mock data
const mockUser = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  createdAt: '2024-01-01T00:00:00Z',
};

const mockItems = [
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Test Item 1',
    description: 'Description 1',
    status: 'ACTIVE',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    name: 'Test Item 2',
    description: 'Description 2',
    status: 'INACTIVE',
    createdAt: '2024-01-02T00:00:00Z',
  },
];

export const handlers = [
  // Auth handlers
  http.post(`${baseUrl}/auth/login`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string };

    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        tokenType: 'Bearer',
        expiresIn: 3600,
      });
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  http.post(`${baseUrl}/auth/register`, async ({ request }) => {
    const body = await request.json() as { email: string };

    if (body.email === 'existing@example.com') {
      return HttpResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    return HttpResponse.json(mockUser, { status: 201 });
  }),

  http.post(`${baseUrl}/auth/refresh`, () => {
    return HttpResponse.json({
      accessToken: 'new-mock-access-token',
      refreshToken: 'new-mock-refresh-token',
      tokenType: 'Bearer',
      expiresIn: 3600,
    });
  }),

  http.post(`${baseUrl}/auth/logout`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Items handlers
  http.get(`${baseUrl}/items`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    let filteredItems = mockItems;
    if (search) {
      filteredItems = mockItems.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return HttpResponse.json({
      content: filteredItems,
      page: 0,
      size: 20,
      totalElements: filteredItems.length,
      totalPages: 1,
      first: true,
      last: true,
    });
  }),

  http.get(`${baseUrl}/items/:id`, ({ params }) => {
    const item = mockItems.find((i) => i.id === params.id);

    if (!item) {
      return HttpResponse.json(
        { message: 'Item not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(item);
  }),

  http.post(`${baseUrl}/items`, async ({ request }) => {
    const body = await request.json() as { name: string; description?: string };

    return HttpResponse.json(
      {
        id: '123e4567-e89b-12d3-a456-426614174003',
        name: body.name,
        description: body.description || '',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),

  http.put(`${baseUrl}/items/:id`, async ({ params, request }) => {
    const body = await request.json() as { name?: string; description?: string };
    const item = mockItems.find((i) => i.id === params.id);

    if (!item) {
      return HttpResponse.json(
        { message: 'Item not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      ...item,
      ...body,
      updatedAt: new Date().toISOString(),
    });
  }),

  http.delete(`${baseUrl}/items/:id`, ({ params }) => {
    const item = mockItems.find((i) => i.id === params.id);

    if (!item) {
      return HttpResponse.json(
        { message: 'Item not found' },
        { status: 404 }
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),

  // Health endpoint
  http.get(`${baseUrl}/health`, () => {
    return HttpResponse.json({
      status: 'UP',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  }),
];
