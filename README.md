# Frontend Development Boilerplate - React/Redux

A production-ready React boilerplate for hackathons featuring Redux Toolkit, TypeScript, Tailwind CSS, JWT authentication, and comprehensive testing.

## Features

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router v6** for routing
- **React Hook Form + Zod** for form validation
- **Tailwind CSS** for styling
- **JWT Authentication** with token refresh
- **90%+ Test Coverage** with Vitest
- **E2E Testing** with Playwright
- **CI/CD Pipelines** for GitHub Actions
- **Docker + Nginx** deployment ready

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- Docker (optional)

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd FrontendDevelopment-React

# Install dependencies
npm install

# Start development server
npm run dev
```

Access the app at http://localhost:3000

### Environment Variables

Create a `.env` file:
```env
VITE_API_URL=http://localhost:8080/api/v1
```

## Project Structure

```
FrontendDevelopment-React/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── common/        # Shared components (Button, Input, etc.)
│   │   ├── items/         # Item-related components
│   │   └── layout/        # Layout components (Header, Sidebar)
│   ├── features/          # Redux slices
│   │   ├── auth/          # Auth state management
│   │   └── items/         # Items state management
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── store/             # Redux store configuration
│   ├── styles/            # Global styles
│   ├── tests/             # Test files
│   │   ├── e2e/           # Playwright E2E tests
│   │   ├── mocks/         # MSW handlers
│   │   └── unit/          # Unit tests
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── docker/                # Docker configuration
├── k8s/                   # Kubernetes manifests
├── .github/workflows/     # CI/CD pipelines
└── docs/                  # Documentation
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests with UI

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run type-check       # TypeScript type check
```

## Authentication Flow

1. User logs in via `/login`
2. JWT tokens stored in localStorage
3. Access token attached to API requests
4. Automatic token refresh on 401 responses
5. Protected routes redirect to login if unauthenticated

## Component Examples

### Using the Button Component
```tsx
import { Button } from '@components/common/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

<Button variant="danger" isLoading={loading}>
  Delete
</Button>
```

### Using the Input Component
```tsx
import { Input } from '@components/common/Input';

<Input
  label="Email"
  type="email"
  error={errors.email?.message}
  {...register('email')}
/>
```

### Using Redux State
```tsx
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchItems } from '@features/items/itemsSlice';

const { items, isLoading } = useAppSelector(state => state.items);
const dispatch = useAppDispatch();

useEffect(() => {
  dispatch(fetchItems());
}, [dispatch]);
```

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose -f docker/docker-compose.yml up --build

# Or build image only
docker build -f docker/Dockerfile -t hackathon-frontend .
```

## Kubernetes Deployment

```bash
# Deploy to environment
kubectl apply -k k8s/overlays/dev
kubectl apply -k k8s/overlays/staging
kubectl apply -k k8s/overlays/prod
```

## Testing

### Unit Tests with Vitest
```bash
npm run test:coverage
```

### E2E Tests with Playwright
```bash
# Install browsers first
npx playwright install

# Run tests
npm run test:e2e
```

## Security Features

- JWT token management with automatic refresh
- CORS configuration
- CSP headers via Nginx
- XSS protection
- Input validation with Zod
- Secure cookie handling

## License

MIT License
