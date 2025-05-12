"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

type AIAgent = {
  id: string
  name: string
  connected: boolean
  provider: string
  logo: string
}

const aiAgents: AIAgent[] = [
  {
    id: "slack-ai",
    name: "Slack AI",
    connected: true,
    provider: "Slack",
    logo: "/placeholder.svg?key=doee2",
  },
  {
    id: "cursor",
    name: "Cursor",
    connected: true,
    provider: "Cursor",
    logo: "/placeholder.svg?key=0v2nr",
  },
  {
    id: "claude",
    name: "Claude",
    connected: false,
    provider: "Anthropic",
    logo: "/placeholder.svg?key=n4h55",
  },
  {
    id: "gpt4",
    name: "GPT-4",
    connected: false,
    provider: "OpenAI",
    logo: "/placeholder.svg?key=q6gz3",
  },
  {
    id: "gemini",
    name: "Gemini",
    connected: false,
    provider: "Google",
    logo: "/placeholder.svg?key=fiu8o",
  },
]

export function CollapsibleAIAgents() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="mb-6">
      {/* Header */}
      <button
        className="flex items-center justify-between w-full py-2 px-3 text-left hover:bg-gray-100/50 rounded-md transition-colors group"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="connected-ai-agents-list"
      >
        <div className="flex items-center">
          {isExpanded ? (
            <ChevronDown className="h-3.5 w-3.5 text-gray-500 mr-1" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-gray-500 mr-1" />
          )}
          <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Connected AI Agents</span>
        </div>
        <button
          className="p-1 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            setIsModalOpen(true)
          }}
          aria-label="Add AI agent"
        >
          <Plus className="h-3.5 w-3.5 text-gray-500" />
        </button>
      </button>

      {/* AI Agents List */}
      {isExpanded && (
        <div id="connected-ai-agents-list" className="mt-1 space-y-1">
          {aiAgents
            .filter((agent) => agent.connected)
            .map((agent) => (
              <div
                key={agent.id}
                className="flex items-center py-1.5 px-3 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <div className="h-5 w-5 mr-2 relative flex-shrink-0 rounded-full overflow-hidden">
                  <Image
                    src={agent.logo || "/placeholder.svg"}
                    alt={`${agent.name} logo`}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm">{agent.name}</span>
              </div>
            ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add AI Agent</DialogTitle>
            <DialogDescription>Connect SageBase to AI agents to enhance your knowledge workflows.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="popular" className="mt-4">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="all">All Agents</TabsTrigger>
            </TabsList>

            <div className="space-y-3 mt-2">
              {aiAgents
                .filter((agent) => !agent.connected)
                .map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <div className="h-6 w-6 mr-3 relative flex-shrink-0 rounded-full overflow-hidden">
                        <Image
                          src={agent.logo || "/placeholder.svg"}
                          alt={`${agent.name} logo`}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-xs text-gray-500">by {agent.provider}</p>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                ))}
            </div>

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
