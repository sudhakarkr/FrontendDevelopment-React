import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchItemById, deleteItem, clearSelectedItem, clearError } from '../features/items/itemsSlice';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Alert } from '../components/common/Alert';
import { ItemForm } from '../components/items/ItemForm';

export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedItem, isLoading, error } = useAppSelector((state) => state.items);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(id));
    }
    return () => {
      dispatch(clearSelectedItem());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (id && window.confirm('Are you sure you want to delete this item?')) {
      const result = await dispatch(deleteItem(id));
      if (deleteItem.fulfilled.match(result)) {
        navigate('/items');
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner className="py-12" />;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="error" onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
        <Link to="/items" className="link">
          &larr; Back to items
        </Link>
      </div>
    );
  }

  if (!selectedItem) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Item not found</p>
        <Link to="/items" className="link mt-4 inline-block">
          &larr; Back to items
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/items" className="text-gray-500 hover:text-gray-700">
          &larr; Back
        </Link>
      </div>

      <div className="card">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h1>
            <span
              className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                selectedItem.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-800'
                  : selectedItem.status === 'INACTIVE'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
              }`}
            >
              {selectedItem.status}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>

        {isEditing ? (
          <ItemForm
            item={selectedItem}
            onSuccess={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 text-gray-900">
                {selectedItem.description || 'No description'}
              </p>
            </div>

            {selectedItem.metadata && Object.keys(selectedItem.metadata).length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Metadata</h3>
                <dl className="mt-1 grid grid-cols-2 gap-2">
                  {Object.entries(selectedItem.metadata).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-2 rounded">
                      <dt className="text-xs text-gray-500">{key}</dt>
                      <dd className="text-sm text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 text-sm text-gray-500">
              <p>Created: {new Date(selectedItem.createdAt).toLocaleString()}</p>
              {selectedItem.updatedAt && (
                <p>Updated: {new Date(selectedItem.updatedAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
