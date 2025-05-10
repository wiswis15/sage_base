"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings, User, BarChart, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NotificationsDropdown from "./notifications-dropdown"
import SageBaseLogo from "./sagebase-logo"

export default function TopNavigation() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<string>(
    pathname?.includes("/insights") ? "insights" : pathname?.includes("/search") ? "search" : "spaces",
  )

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <SageBaseLogo size={32} showTagline={true} />
            </Link>
            <nav className="flex items-center space-x-1">
              <Link href="/" passHref>
                <Button
                  variant={activeTab === "spaces" ? "default" : "ghost"}
                  className={`text-sm ${activeTab === "spaces" ? "bg-emerald-600 text-white" : ""}`}
                  onClick={() => setActiveTab("spaces")}
                >
                  <Search className="mr-1.5 h-4 w-4" />
                  Search
                </Button>
              </Link>
              <Link href="/insights" passHref>
                <Button
                  variant={activeTab === "insights" ? "default" : "ghost"}
                  className={`text-sm ${activeTab === "insights" ? "bg-emerald-600 text-white" : ""}`}
                  onClick={() => setActiveTab("insights")}
                >
                  <BarChart className="mr-1.5 h-4 w-4" />
                  Insights
                </Button>
              </Link>
              <Button variant="ghost" className="text-sm">
                Teams
              </Button>
              <Button variant="ghost" className="text-sm">
                Integrations
              </Button>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <NotificationsDropdown />
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
