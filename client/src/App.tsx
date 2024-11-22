import React from 'react';
import { Helmet } from 'react-helmet';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout.js';
import EpisodePage from './components/pages/EpisodePage/EpisodePage.js';
import ErrorPage from './components/pages/ErrorPage/ErrorPage.js';
import HeroPage from './components/pages/HeroPage/HeroPage.js';
import MainPage from './components/pages/MainPage/MainPage.js';

export default function App(): React.JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/card',
          element: <HeroPage />,
        },
        {
          path: '/episode',
          element: <EpisodePage />,
        },
      ],
    },
  ]);
  return (
    <>
      <Helmet>
        <link rel="icon" type="image/png" href="/logo-removebg-preview.png" />
      </Helmet>
      <RouterProvider router={router} />
    </>
  );
}
