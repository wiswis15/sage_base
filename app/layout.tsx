import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import TeamsIntegrationBanner from "@/components/teams-integration-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SageBase - Your company already knows the answer",
  description: "Find knowledge from Confluence, Jira, Slack, GitHub, and Email using AI-powered search",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TeamsIntegrationBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
