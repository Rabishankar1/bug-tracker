"use client";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyles } from "@/styles/GlobalStyles";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <StyledComponentsRegistry>
            <AuthProvider>
              <Navbar />
              {children}
              {modal}
            </AuthProvider>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
