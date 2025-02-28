import './globals.css';
import Provider from './provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Oswald } from 'next/font/google'

export const metadata = {
  title: 'AI-VDGY',
  description: 'AI Video Generator Application',
};
const oswald = Oswald({subsets:['latin']})


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {' '}
      <html lang="en">
        <body className={oswald.className
        }>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
