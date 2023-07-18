'use client';
import { AppProvider } from "./AppContext";

export function Providers({ children }) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}