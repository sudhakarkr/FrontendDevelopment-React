import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createItem, updateItem } from '../../features/items/itemsSlice';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import type { Item } from '../../types';

const itemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().max(2000).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']),
});

type ItemFormData = z.infer<typeof itemSchema>;

interface ItemFormProps {
  item?: Item;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ItemForm({ item, onSuccess, onCancel }: ItemFormProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.items);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      status: item?.status || 'ACTIVE',
    },
  });

  const onSubmit = async (data: ItemFormData) => {
    let result;
    if (item) {
      result = await dispatch(updateItem({ id: item.id, data }));
      if (updateItem.fulfilled.match(result)) {
        onSuccess?.();
      }
    } else {
      result = await dispatch(createItem(data));
      if (createItem.fulfilled.match(result)) {
        onSuccess?.();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        {...register('name')}
        error={errors.name?.message}
        placeholder="Enter item name"
      />

      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="input min-h-[100px]"
          placeholder="Enter item description"
        />
        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="label">
          Status
        </label>
        <select id="status" {...register('status')} className="input">
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <div className="flex gap-3 justify-end pt-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isLoading}>
          {item ? 'Update Item' : 'Create Item'}
        </Button>
      </div>
    </form>
  );
}
