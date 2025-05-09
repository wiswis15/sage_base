"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"
import SideNavigation from "@/components/side-navigation"
import TopNavigation from "@/components/top-navigation"
import SageBaseLogo from "@/components/sagebase-logo"
import TeamsChatModal from "@/components/teams-chat-modal"

export default function TeamsIntegrationPage() {
  const [isTeamsChatOpen, setIsTeamsChatOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <SideNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 mb-4">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Microsoft Teams Integration</h1>
              <p className="text-gray-600">
                Access all your company knowledge directly from Microsoft Teams with the SageBase app.
              </p>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-8 w-8 text-blue-600 mr-3" />
                    <SageBaseLogo size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">SageBase for Microsoft Teams</h2>
                  <p className="text-gray-700 mb-6">
                    Stay in your workflow and access all your company knowledge without leaving Microsoft Teams. Ask
                    questions, search documents, and get instant answers from across all your connected platforms.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Download className="mr-2 h-4 w-4" />
                      Install SageBase App
                    </Button>
                    <Button variant="outline" onClick={() => setIsTeamsChatOpen(true)}>
                      Try Demo
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                    <div className="bg-blue-600 text-white rounded-t-md p-2 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Microsoft Teams</span>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-b-md">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-emerald-600 text-xs font-medium">SB</span>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 text-sm">
                          <p>Hello! I'm SageBase. Ask me anything about your company knowledge.</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-end mb-4">
                        <div className="bg-blue-600 rounded-lg p-3 text-sm text-white">
                          <p>How do I implement OAuth in the Atlas API?</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-emerald-600 text-xs font-medium">SB</span>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3 text-sm">
                          <p>
                            The Atlas API uses OAuth 2.0 with JWT tokens. Here's how to implement it:
                            <br />
                            1. Register your client in the developer portal
                            <br />
                            2. Use the client ID and secret to request an access token
                            <br />
                            3. Include the token in your Authorization header
                          </p>
                          <div className="mt-2 text-xs text-gray-500">From: API Authentication Documentation</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg inline-block mb-4">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Chat with SageBase</h3>
                <p className="text-gray-600">
                  Ask questions in natural language and get instant answers from your company's knowledge base.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="bg-emerald-100 p-2 rounded-lg inline-block mb-4">
                  <Search className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Unified Search</h3>
                <p className="text-gray-600">
                  Search across Confluence, Jira, Slack, GitHub, and Email without leaving Microsoft Teams.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="bg-purple-100 p-2 rounded-lg inline-block mb-4">
                  <BarChart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Knowledge Insights</h3>
                <p className="text-gray-600">
                  Get insights into your team's knowledge usage and identify documentation gaps.
                </p>
              </div>
            </div>

            {/* Setup Steps */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Getting Started</h3>
              <ol className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">1</span>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-800">
                      Install the SageBase app for Microsoft Teams
                    </h4>
                    <p className="text-gray-600 mt-1">
                      Visit the Microsoft Teams app store and search for "SageBase" or use the direct installation link.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">2</span>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-800">Connect your knowledge platforms</h4>
                    <p className="text-gray-600 mt-1">
                      Follow the setup wizard to connect SageBase to your Confluence, Jira, Slack, GitHub, and Email
                      accounts.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">3</span>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-gray-800">Start asking questions</h4>
                    <p className="text-gray-600 mt-1">
                      Open the SageBase app in Teams and start asking questions in natural language to access your
                      company knowledge.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100 shadow-sm text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ready to get started?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Install the SageBase app for Microsoft Teams today and give your team instant access to all your company
                knowledge.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="mr-2 h-4 w-4" />
                  Install SageBase for Teams
                </Button>
                <Button variant="outline" onClick={() => setIsTeamsChatOpen(true)}>
                  Try Demo
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <TeamsChatModal isOpen={isTeamsChatOpen} onClose={() => setIsTeamsChatOpen(false)} />
    </div>
  )
}

import { BarChart, Search } from "lucide-react"
