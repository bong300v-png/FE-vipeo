import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkThemeProvider } from "@/components/clerk-theme-provider";
import { NavigationLoading } from "@/components/navigation-loading";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vipeo — AI Director Studio",
  description:
    "Turn ideas into finished video workflows with Vipeo skills, credits, async rendering, and multilingual outputs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-full">
        <ClerkThemeProvider>
          <ToastProvider>
            <NavigationLoading />
            {children}
          </ToastProvider>
        </ClerkThemeProvider>
      </body>
    </html>
  );
}
