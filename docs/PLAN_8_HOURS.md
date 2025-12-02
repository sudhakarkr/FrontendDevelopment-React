# 8-Hour Frontend Implementation Plan

This guide helps you implement a complete frontend use case using this boilerplate within an 8-hour hackathon.

## Pre-Event Setup
- [ ] Clone repository and run `npm install`
- [ ] Verify `npm run dev` works
- [ ] Familiarize with project structure
- [ ] Read `agent.md` guidelines

---

## Hour 1: Setup & Planning (60 min)

### 1.1 Environment Setup (15 min)
```bash
git clone <repository-url> my-frontend
cd my-frontend
npm install
npm run dev
```

### 1.2 Define UI Requirements (20 min)
- List pages needed
- Sketch component hierarchy
- Define state structure
- Identify API endpoints needed

### 1.3 Plan Routes (15 min)
- Map routes in `App.tsx`
- Identify protected vs public routes
- Plan navigation structure

### 1.4 Review API Contract (10 min)
- Review backend API documentation
- Note endpoint URLs and payloads
- Update `services/` if needed

**Deliverables:**
- Running dev environment
- Route structure planned
- Component list defined

---

## Hour 2: Types & Redux Setup (60 min)

### 2.1 Define Types (20 min)
Add to `src/types/index.ts`:
```typescript
export interface YourEntity {
  id: string;
  name: string;
  // Add fields
}

export interface CreateYourEntityRequest {
  name: string;
}
```

### 2.2 Create API Service (15 min)
Create `src/services/yourEntityService.ts`:
```typescript
import api from './api';
import type { YourEntity, CreateYourEntityRequest } from '../types';

export const yourEntityService = {
  getAll: () => api.get<YourEntity[]>('/your-entities'),
  create: (data: CreateYourEntityRequest) => api.post<YourEntity>('/your-entities', data),
};
```

### 2.3 Create Redux Slice (25 min)
Create `src/features/yourEntity/yourEntitySlice.ts`:
```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { yourEntityService } from '../../services/yourEntityService';

export const fetchEntities = createAsyncThunk('entities/fetchAll', async () => {
  return yourEntityService.getAll();
});

const slice = createSlice({
  name: 'yourEntity',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntities.pending, (state) => { state.isLoading = true; })
      .addCase(fetchEntities.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      });
  },
});

export default slice.reducer;
```

**Deliverables:**
- TypeScript types defined
- API service created
- Redux slice implemented

---

## Hour 3: Core Components (60 min)

### 3.1 Create Page Components (30 min)
Create pages in `src/pages/`:
- `YourEntityListPage.tsx`
- `YourEntityDetailPage.tsx`

### 3.2 Create Feature Components (30 min)
Create in `src/components/yourEntity/`:
- `YourEntityCard.tsx`
- `YourEntityForm.tsx`
- `YourEntityList.tsx`

**Deliverables:**
- Page components created
- Feature components created

---

## Hour 4: Forms & Validation (60 min)

### 4.1 Create Form Schema (15 min)
```typescript
import { z } from 'zod';

export const yourEntitySchema = z.object({
  name: z.string().min(1, 'Required').max(100),
  // Add fields
});
```

### 4.2 Implement Form Component (30 min)
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function YourEntityForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(yourEntitySchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Name" {...register('name')} error={errors.name?.message} />
      <Button type="submit">Save</Button>
    </form>
  );
}
```

### 4.3 Connect to Redux (15 min)
- Dispatch actions from form
- Handle success/error states
- Add loading indicators

**Deliverables:**
- Form validation working
- Form connected to Redux

---

## Hour 5: List & Detail Views (60 min)

### 5.1 Implement List View (30 min)
```tsx
export function YourEntityListPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector(state => state.yourEntity);

  useEffect(() => {
    dispatch(fetchEntities());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? <LoadingSpinner /> : (
        items.map(item => <YourEntityCard key={item.id} item={item} />)
      )}
    </div>
  );
}
```

### 5.2 Implement Detail View (30 min)
```tsx
export function YourEntityDetailPage() {
  const { id } = useParams();
  // Fetch and display entity details
}
```

**Deliverables:**
- List view showing data
- Detail view with navigation

---

## Hour 6: Testing (60 min)

### 6.1 Unit Tests (40 min)
Create tests for:
- Redux slice actions/reducers
- Form component
- List component

```typescript
describe('YourEntitySlice', () => {
  it('should fetch entities', async () => {
    // Test implementation
  });
});
```

### 6.2 Run Coverage (20 min)
```bash
npm run test:coverage
```
- Fix any coverage gaps
- Target 90%+ coverage

**Deliverables:**
- Unit tests passing
- Coverage above 90%

---

## Hour 7: Styling & Polish (60 min)

### 7.1 Apply Styling (30 min)
- Use Tailwind utility classes
- Ensure responsive design
- Add loading states
- Add error states

### 7.2 Add Transitions (15 min)
- Page transitions
- Loading animations
- Hover effects

### 7.3 Accessibility Check (15 min)
- Add ARIA labels
- Check keyboard navigation
- Verify color contrast

**Deliverables:**
- Polished UI
- Responsive design
- Accessible components

---

## Hour 8: Integration & Documentation (60 min)

### 8.1 E2E Test (20 min)
```typescript
test('should create entity', async ({ page }) => {
  await page.goto('/your-entities');
  await page.click('text=Add New');
  await page.fill('[name="name"]', 'Test Entity');
  await page.click('text=Save');
  await expect(page.locator('text=Test Entity')).toBeVisible();
});
```

### 8.2 Build & Verify (20 min)
```bash
npm run build
npm run preview
```

### 8.3 Documentation (20 min)
- Update README with new features
- Document new components
- Add usage examples

**Deliverables:**
- E2E tests passing
- Production build working
- Documentation updated

---

## Final Checklist

### Must Have
- [ ] All pages implemented
- [ ] Forms with validation
- [ ] Redux state management
- [ ] Unit tests (90%+ coverage)
- [ ] Build succeeds

### Nice to Have
- [ ] E2E tests
- [ ] Animations
- [ ] Error boundaries
- [ ] Loading skeletons
