'use client';
import { StrictMode } from 'react';
import { StoreProvider } from './contexts/storeContext';

const AppLayout = ({ children }) => {
  return (
    <StrictMode>
      <StoreProvider>{children}</StoreProvider>
    </StrictMode>
  );
};

export default AppLayout;