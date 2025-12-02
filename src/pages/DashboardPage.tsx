import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchItems } from '../features/items/itemsSlice';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items, pagination, isLoading } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems({ size: 5 }));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.firstName || 'User'}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900">Total Items</h3>
          <p className="mt-2 text-3xl font-bold text-primary-600">
            {pagination.totalElements}
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900">Active Items</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {items.filter((i) => i.status === 'ACTIVE').length}
          </p>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900">Archived Items</h3>
          <p className="mt-2 text-3xl font-bold text-gray-600">
            {items.filter((i) => i.status === 'ARCHIVED').length}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Items</h2>
          <Link to="/items" className="link text-sm">
            View all
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No items yet</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.slice(0, 5).map((item) => (
              <li key={item.id} className="py-3">
                <Link
                  to={`/items/${item.id}`}
                  className="flex justify-between items-center hover:bg-gray-50 -mx-4 px-4 py-2 rounded"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.description?.substring(0, 50) || 'No description'}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'INACTIVE'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
