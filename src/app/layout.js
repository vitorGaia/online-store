import './globals.css';

export const metadata = {
  title: 'Online Store',
  description: '...',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
