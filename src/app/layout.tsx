import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import SideIcons from "@/components/SideIcons";
import { TodoProvider } from "@/context/TodoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To-Do App",
  description: "A to-do app built with Next.js and React Three Fiber",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <TodoProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SidebarProvider>
              <div className="flex h-screen w-full overflow-hidden">
                <div className="flex flex-col h-full w-12 bg-gray-100 shrink-0">
                  <SideIcons />
                </div>

                <div className="flex flex-col h-full">
                  <AppSidebar />
                </div>

                <main className="flex-1 flex flex-col  overflow-y-auto">
                  <SidebarTrigger />
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </TodoProvider>
      </body>
    </html>
  );
}
