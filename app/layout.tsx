import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import "./globals.css";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "A little Issue Tracker project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="dark" accentColor="tomato" grayColor="gray" radius="large" scaling="105%">
              <NavBar/>
              <Container>
                <main className="p-3">
                  {children}
                </main>
              </Container>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
