import { Link } from 'react-router-dom';

import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mt-4">Page not found</h2>
        <p className="text-gray-600 mt-2">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
}
