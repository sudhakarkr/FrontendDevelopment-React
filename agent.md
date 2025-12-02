# Agent Quality & Security Guidelines - Frontend

## Overview
Quality and security guidelines for AI agents and developers working on this React/Redux frontend codebase.

## Code Quality Standards

### 1. TypeScript Best Practices
- Enable strict mode in tsconfig
- Avoid `any` type - use proper typing
- Use interfaces for object shapes
- Export types from a central location
- Use generics when appropriate

### 2. React Best Practices
- Use functional components with hooks
- Keep components small and focused (< 200 lines)
- Use custom hooks for reusable logic
- Memoize expensive computations with `useMemo`
- Memoize callbacks with `useCallback` when needed
- Avoid prop drilling - use context or Redux

### 3. Redux Best Practices
- Use Redux Toolkit (RTK)
- Keep slice logic focused
- Use createAsyncThunk for async operations
- Normalize complex state
- Use selectors for derived data
- Avoid storing derived state

### 4. Component Structure
```tsx
// 1. Imports (grouped)
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@store/hooks';
import { Button } from '@components/common/Button';
import type { Item } from '@types';

// 2. Types/Interfaces
interface Props {
  item: Item;
  onSave: (item: Item) => void;
}

// 3. Component
export function ItemCard({ item, onSave }: Props) {
  // 4. Hooks
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  // 5. Effects
  useEffect(() => {
    // ...
  }, []);

  // 6. Handlers
  const handleSave = () => {
    onSave(item);
  };

  // 7. Render
  return (
    <div>...</div>
  );
}
```

## Testing Requirements

### Coverage Thresholds
- **Minimum 90% coverage** enforced
- Branches: 90%
- Functions: 90%
- Lines: 90%
- Statements: 90%

### Unit Testing Guidelines
- Test component rendering
- Test user interactions
- Test error states
- Test loading states
- Mock external dependencies

### E2E Testing Guidelines
- Test critical user flows
- Test authentication flow
- Test CRUD operations
- Test error handling
- Use data-testid for selectors

### Test File Naming
```
ComponentName.test.tsx    # Unit tests
feature.spec.ts          # E2E tests
```

## Security Guidelines

### 1. Authentication
- Store tokens securely
- Implement token refresh
- Clear tokens on logout
- Protect routes properly
- Validate tokens client-side

### 2. Input Validation
- Validate all form inputs
- Use Zod for schema validation
- Sanitize displayed user input
- Prevent XSS attacks

### 3. API Security
- Use HTTPS in production
- Include CSRF tokens if needed
- Handle errors without exposing details
- Implement rate limiting feedback

### 4. Dependency Security
- Run `npm audit` regularly
- Keep dependencies updated
- Review new dependencies
- Use lockfiles

### 5. Content Security
- Avoid `dangerouslySetInnerHTML`
- Sanitize any HTML content
- Use CSP headers (via Nginx)
- Validate file uploads

## Performance Guidelines

### 1. Bundle Optimization
- Use code splitting
- Lazy load routes
- Tree shake unused code
- Analyze bundle size

### 2. Rendering Optimization
- Use React.memo for expensive components
- Virtualize long lists
- Debounce search inputs
- Optimize images

### 3. State Management
- Avoid unnecessary re-renders
- Use selectors for derived data
- Keep state normalized
- Batch state updates

## Styling Guidelines

### Tailwind CSS Conventions
- Use utility classes
- Create components for repeated patterns
- Use `@apply` sparingly
- Follow mobile-first approach

### Component Styling
```tsx
// Use clsx for conditional classes
import clsx from 'clsx';

<div className={clsx(
  'base-styles',
  isActive && 'active-styles',
  className
)}>
```

## Accessibility (a11y)

### Requirements
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Screen reader testing

### Checklist
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Buttons have accessible names
- [ ] Modals trap focus
- [ ] Error messages are announced

## Development Workflow

### Branch Naming
```
feature/add-login-page
bugfix/fix-token-refresh
hotfix/security-patch
```

### Commit Messages
```
feat(auth): add login form validation
fix(items): correct pagination logic
test(auth): add login e2e tests
style: format with prettier
```

### PR Checklist
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] Unit tests pass with 90%+ coverage
- [ ] E2E tests pass
- [ ] No console.log statements
- [ ] Accessibility checked

## Quick Reference Commands

```bash
# Development
npm run dev

# Quality checks
npm run lint
npm run format:check
npm run type-check

# Testing
npm run test
npm run test:coverage
npm run test:e2e

# Build
npm run build
npm run preview

# Docker
docker build -f docker/Dockerfile -t frontend .
docker-compose -f docker/docker-compose.yml up
```

## Common Issues

### Issue: Token not refreshing
**Solution:** Check axios interceptor setup and refresh token storage

### Issue: State not updating
**Solution:** Verify Redux actions are dispatched and reducers handle them

### Issue: Tests failing with MSW
**Solution:** Ensure handlers are properly set up and server is started

### Issue: Build size too large
**Solution:** Check for unnecessary imports, enable code splitting

## Contact & Support

- Create GitHub issues for bugs
- Check documentation in `/docs`
- Review existing tests for examples
