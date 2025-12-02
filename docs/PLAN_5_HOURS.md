# 5-Hour Frontend Implementation Plan

A focused plan for implementing a frontend use case in 5 hours.

## Pre-Event
- Repository cloned and verified
- `npm install` completed
- Dev server tested

---

## Hour 1: Setup & Core Structure (60 min)

### 1.1 Quick Start (10 min)
```bash
git checkout -b feature/my-feature
npm run dev
```

### 1.2 Define Types (15 min)
```typescript
// src/types/index.ts
export interface MyEntity {
  id: string;
  name: string;
  status: string;
}
```

### 1.3 Create API Service (15 min)
```typescript
// src/services/myEntityService.ts
export const myEntityService = {
  getAll: () => api.get<MyEntity[]>('/my-entities'),
  create: (data) => api.post<MyEntity>('/my-entities', data),
};
```

### 1.4 Create Redux Slice (20 min)
```typescript
// src/features/myEntity/myEntitySlice.ts
const slice = createSlice({
  name: 'myEntity',
  initialState: { items: [], isLoading: false },
  // Add reducers and extraReducers
});
```

**Checkpoint:** Types, service, and Redux ready

---

## Hour 2: Components & Pages (60 min)

### 2.1 Create List Page (25 min)
```tsx
// src/pages/MyEntityListPage.tsx
export function MyEntityListPage() {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector(s => s.myEntity);

  useEffect(() => { dispatch(fetchAll()); }, []);

  return (
    <div className="space-y-4">
      <h1>My Entities</h1>
      {items.map(item => (
        <div key={item.id} className="card">{item.name}</div>
      ))}
    </div>
  );
}
```

### 2.2 Create Form Component (25 min)
```tsx
// src/components/myEntity/MyEntityForm.tsx
const schema = z.object({ name: z.string().min(1) });

export function MyEntityForm({ onSuccess }) {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await dispatch(createEntity(data));
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Name" {...register('name')} />
      <Button type="submit">Create</Button>
    </form>
  );
}
```

### 2.3 Add Routes (10 min)
```tsx
// src/App.tsx
<Route path="/my-entities" element={<MyEntityListPage />} />
```

**Checkpoint:** Pages rendering, form working

---

## Hour 3: Integration & Polish (60 min)

### 3.1 Connect All Pieces (20 min)
- Wire up create form to Redux
- Add success/error handling
- Add loading states

### 3.2 Add Navigation (15 min)
```tsx
// Update Sidebar.tsx
{ name: 'My Entities', path: '/my-entities', icon: <Icon /> }
```

### 3.3 Style Components (25 min)
- Apply Tailwind classes
- Add hover effects
- Make responsive

**Checkpoint:** Full CRUD working

---

## Hour 4: Testing (60 min)

### 4.1 Unit Tests (40 min)
```typescript
// src/tests/unit/myEntitySlice.test.ts
describe('myEntitySlice', () => {
  it('should add entity on create', () => {
    // Test
  });
});

// src/tests/unit/MyEntityForm.test.tsx
describe('MyEntityForm', () => {
  it('should submit form', () => {
    // Test
  });
});
```

### 4.2 Run Coverage (20 min)
```bash
npm run test:coverage
```

**Checkpoint:** Tests passing, >80% coverage

---

## Hour 5: Finalization (60 min)

### 5.1 Build & Test (20 min)
```bash
npm run build
npm run preview
```

### 5.2 Code Cleanup (20 min)
```bash
npm run lint:fix
npm run format
```

### 5.3 Commit & Push (20 min)
```bash
git add .
git commit -m "feat: implement my entity feature"
git push
```

---

## Quick Checklist

### Essential
- [ ] List view working
- [ ] Create form working
- [ ] Redux state management
- [ ] Unit tests passing

### If Time Permits
- [ ] Detail view
- [ ] Edit/Delete
- [ ] E2E tests
- [ ] 90% coverage

---

## Shortcuts If Behind

1. **Skip form validation** - Add later
2. **Simple styling** - Use existing card component
3. **Minimal tests** - Test Redux slice only
4. **Copy patterns** - Use Items as template

---

## Commands Cheat Sheet

```bash
npm run dev           # Start dev server
npm run test         # Run tests
npm run test:coverage # With coverage
npm run build        # Production build
npm run lint:fix     # Fix lint issues
```
