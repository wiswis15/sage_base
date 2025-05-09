"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, MessageSquare } from "lucide-react"
import Link from "next/link"
import TeamsChatModal from "./teams-chat-modal"

export default function TeamsIntegrationBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isTeamsChatOpen, setIsTeamsChatOpen] = useState(false)

  if (!isVisible) return null

  return (
    <>
      <div className="bg-blue-600 text-white py-2 px-4 w-full">
        <div className="container mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-200" />
            <span className="text-sm">
              <span className="font-medium">New:</span> SageBase is now available directly in Microsoft Teams!
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/teams-integration" className="text-sm text-blue-100 hover:text-white flex items-center">
              <span>Learn more</span>
              <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-blue-300 text-white hover:bg-blue-700 hover:text-white text-xs h-7 px-2"
              onClick={() => setIsTeamsChatOpen(true)}
            >
              Open in Teams
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-blue-200 hover:text-white"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <TeamsChatModal isOpen={isTeamsChatOpen} onClose={() => setIsTeamsChatOpen(false)} />
    </>
  )
}
