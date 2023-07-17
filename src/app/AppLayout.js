'use client';
import { StoreProvider } from './contexts/StoreContext';

const AppLayout = ({ children }) => <StoreProvider>{children}</StoreProvider>;

export default AppLayout;