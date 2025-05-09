"use client"

import type React from "react"

import { useState } from "react"
import { Database, FileText, MessageSquare, Code, Mail, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Platform = {
  id: string
  name: string
  icon: React.ReactNode
  connected: boolean
  category: "documentation" | "requirements" | "communication" | "code"
}

export default function ConnectedPlatforms() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [platforms, setPlatforms] = useState<Platform[]>([
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
      id: "email",
      name: "Email",
      icon: <Mail className="h-4 w-4 text-red-500" />,
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

    // Documentation tools
    {
      id: "notion",
      name: "Notion",
      icon: <Database className="h-4 w-4 text-gray-700" />,
      connected: false,
      category: "documentation",
    },
    {
      id: "nuclino",
      name: "Nuclino",
      icon: <Database className="h-4 w-4 text-blue-500" />,
      connected: false,
      category: "documentation",
    },
    {
      id: "document360",
      name: "Document360",
      icon: <Database className="h-4 w-4 text-green-500" />,
      connected: false,
      category: "documentation",
    },
    {
      id: "scribe",
      name: "Scribe",
      icon: <Database className="h-4 w-4 text-orange-500" />,
      connected: false,
      category: "documentation",
    },

    // Requirements management tools
    {
      id: "ibm-doors",
      name: "IBM DOORS",
      icon: <FileText className="h-4 w-4 text-blue-700" />,
      connected: false,
      category: "requirements",
    },
    {
      id: "helix-alm",
      name: "Helix ALM",
      icon: <FileText className="h-4 w-4 text-purple-700" />,
      connected: false,
      category: "requirements",
    },
    {
      id: "jama-connect",
      name: "Jama Connect",
      icon: <FileText className="h-4 w-4 text-green-700" />,
      connected: false,
      category: "requirements",
    },
    {
      id: "polarion",
      name: "Polarion Requirements",
      icon: <FileText className="h-4 w-4 text-red-700" />,
      connected: false,
      category: "requirements",
    },
  ])

  const toggleConnection = (platformId: string) => {
    setPlatforms(
      platforms.map((platform) =>
        platform.id === platformId ? { ...platform, connected: !platform.connected } : platform,
      ),
    )
  }

  const connectedPlatforms = platforms.filter((platform) => platform.connected)

  return (
    <>
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-emerald-100 p-2 rounded-lg mr-4">
              <Database className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Connected Platforms</h3>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            size="sm"
            className="bg-white border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Connection
          </Button>
        </div>
        <p className="text-gray-600 mb-4">
          SageBase connects to all your team's knowledge platforms, bringing information together in one unified
          workspace.
        </p>
        <div className="flex flex-wrap gap-2">
          {connectedPlatforms.map((platform) => (
            <div
              key={platform.id}
              className="flex items-center bg-white rounded-full px-3 py-1 text-sm border border-emerald-100"
            >
              {platform.icon}
              <span className="ml-1.5">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>

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

            <TabsContent value="documentation" className="space-y-4">
              <div className="border rounded-md">
                <div className="p-4 border-b bg-gray-50">
                  <h3 className="font-medium flex items-center">
                    <span className="mr-2">📄</span> Documentation Tools
                  </h3>
                </div>
                <div className="divide-y">
                  {platforms
                    .filter((p) => p.category === "documentation")
                    .map((platform, index) => (
                      <div key={platform.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-500">{index + 1}.</span>
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        <Button
                          variant={platform.connected ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleConnection(platform.id)}
                        >
                          {platform.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-4">
              <div className="border rounded-md">
                <div className="p-4 border-b bg-gray-50">
                  <h3 className="font-medium flex items-center">
                    <span className="mr-2">✅</span> Requirements Management Tools
                  </h3>
                </div>
                <div className="divide-y">
                  {platforms
                    .filter((p) => p.category === "requirements")
                    .map((platform, index) => (
                      <div key={platform.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-500">{index + 1}.</span>
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        <Button
                          variant={platform.connected ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleConnection(platform.id)}
                        >
                          {platform.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-4">
              <div className="border rounded-md">
                <div className="p-4 border-b bg-gray-50">
                  <h3 className="font-medium flex items-center">
                    <span className="mr-2">💬</span> Communication Tools
                  </h3>
                </div>
                <div className="divide-y">
                  {platforms
                    .filter((p) => p.category === "communication")
                    .map((platform, index) => (
                      <div key={platform.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-500">{index + 1}.</span>
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        <Button
                          variant={platform.connected ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleConnection(platform.id)}
                        >
                          {platform.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    ))}
                </div>
              </div>

              <div className="border rounded-md">
                <div className="p-4 border-b bg-gray-50">
                  <h3 className="font-medium flex items-center">
                    <span className="mr-2">💻</span> Code & Version Control
                  </h3>
                </div>
                <div className="divide-y">
                  {platforms
                    .filter((p) => p.category === "code")
                    .map((platform, index) => (
                      <div key={platform.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-500">{index + 1}.</span>
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        <Button
                          variant={platform.connected ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleConnection(platform.id)}
                        >
                          {platform.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
