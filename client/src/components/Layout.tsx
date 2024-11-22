import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from './HOC/Loader/Loader';
import NavBar from './ui/NavBar/NavBar';

export default function Layout(): React.JSX.Element {
  const [isLoading] = useState<boolean>(false);

  return (
    <Loader showSpinner={isLoading}>
      <NavBar />
      <Outlet />
    </Loader>
  );
}
