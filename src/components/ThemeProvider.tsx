"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function ThemeProvider({ children, ...props}: React.ComponentProps<typeof NextThemeProvider> & { children: ReactNode }) {
  return <NextThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  {...props}
  >{children}</NextThemeProvider>;
}
