"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, ChevronDown, Database, FileText, MessageSquare, Code, Mail, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Platform = {
  id: string
  name: string
  icon: React.ReactNode
  connected: boolean
  category: "documentation" | "requirements" | "communication" | "code"
}

const platforms: Platform[] = [
  {
    id: "confluence",
    name: "Confluence",
    icon: <Database className="h-4 w-4 text-emerald-500" />,
    connected: true,
    category: "documentation",
  },
  {
    id: "jira",
    name: "Jira",
    icon: <FileText className="h-4 w-4 text-blue-500" />,
    connected: true,
    category: "requirements",
  },
  {
    id: "slack",
    name: "Slack",
    icon: <MessageSquare className="h-4 w-4 text-purple-500" />,
    connected: true,
    category: "communication",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    icon: <MessageSquare className="h-4 w-4 text-blue-600" />,
    connected: true,
    category: "communication",
  },
  {
    id: "github",
    name: "GitHub",
    icon: <Code className="h-4 w-4 text-gray-700" />,
    connected: true,
    category: "code",
  },
  {
    id: "email",
    name: "Email",
    icon: <Mail className="h-4 w-4 text-red-500" />,
    connected: true,
    category: "communication",
  },
]

export function CollapsiblePlatforms() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="mb-6">
      {/* Header */}
      <button
        className="flex items-center justify-between w-full py-2 px-3 text-left hover:bg-gray-100/50 rounded-md transition-colors group"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="connected-platforms-list"
      >
        <div className="flex items-center">
          {isExpanded ? (
            <ChevronDown className="h-3.5 w-3.5 text-gray-500 mr-1" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-gray-500 mr-1" />
          )}
          <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Connected Platforms</span>
        </div>
        <button
          className="p-1 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            setIsModalOpen(true)
          }}
          aria-label="Add platform"
        >
          <Plus className="h-3.5 w-3.5 text-gray-500" />
        </button>
      </button>

      {/* Platform List */}
      {isExpanded && (
        <div id="connected-platforms-list" className="mt-1 space-y-1">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="flex items-center py-1.5 px-3 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              {platform.icon}
              <span className="ml-2 text-sm">{platform.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Platform Connection</DialogTitle>
            <DialogDescription>
              Connect SageBase to your team's knowledge platforms to unify your workspace.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="documentation" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            {/* Tab content would go here */}
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Done
              </Button>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
