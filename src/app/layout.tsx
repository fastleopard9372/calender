'use client'
import { Provider } from 'react-redux';
import { store } from './redux/store';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from '@radix-ui/themes';
import "./globals.css";
import '@radix-ui/themes/styles.css';
import '@radix-ui/themes/tokens.css';
import '@radix-ui/themes/components.css';
import '@radix-ui/themes/utilities.css';
import '@radix-ui/themes/layout.css';
import './styles.css';
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Theme>
            {children}
          </Theme>
        </Provider>

      </body>
    </html>
  );
}
