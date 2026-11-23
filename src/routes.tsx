import { RouteObject } from 'react-router';
import { lazy } from 'react';
import HomePage from './pages/index';
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = ProdNotFoundPage;

const AboutPage = lazy(() => import('./pages/about'));
const PreorderPage = lazy(() => import('./pages/preorder'));
const ContactPage = lazy(() => import('./pages/contact'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/preorder',
    element: <PreorderPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    id: 'airo-not-found',
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/about' | '/preorder' | '/contact';

export type Params = Record<string, string | undefined>;
