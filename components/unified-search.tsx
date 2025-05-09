"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  Database,
  FileText,
  MessageSquare,
  Code,
  Mail,
  X,
  Filter,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  MessageCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import ChatInterface from "./chat-interface"

export default function UnifiedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [aiSummary, setAiSummary] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "confluence",
    "jira",
    "slack",
    "teams",
    "github",
    "email",
  ])
  const [isSearching, setIsSearching] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    try {
      // Call our API route directly
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: searchQuery,
          conversationHistory: "",
        }),
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()

      // Generate mock results
      const mockResults = generateMockResults()
      setSearchResults(mockResults)

      // Use the API response as the AI summary
      setAiSummary(data.response || generateAiSummary(mockResults, searchQuery))

      setIsSearching(false)
    } catch (error) {
      console.error("Error in search:", error)

      // Fallback to local generation if API fails
      const mockResults = generateMockResults()
      setSearchResults(mockResults)
      setAiSummary(generateAiSummary(mockResults, searchQuery))

      setIsSearching(false)
    }
  }

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setAiSummary("")
    setShowChat(false)
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "confluence":
        return <Database className="h-4 w-4 text-emerald-500" />
      case "jira":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "slack":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "teams":
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case "github":
        return <Code className="h-4 w-4 text-gray-700" />
      case "email":
        return <Mail className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getSourceLabel = (source: string) => {
    return source === "teams" ? "Microsoft Teams" : source.charAt(0).toUpperCase() + source.slice(1)
  }

  // Generate AI summary based on search results
  const generateAiSummary = (results: any[], query: string) => {
    if (
      query.toLowerCase().includes("authentication") ||
      query.toLowerCase().includes("auth") ||
      query.toLowerCase().includes("oauth")
    ) {
      return `"${query}" relates to how the system handles authentication using OAuth 2.0 and JWT tokens. The authentication flow requires generating tokens with a 1-hour expiration time that must be included in the Authorization header of all API requests. There's currently an ongoing effort to implement a token refresh mechanism (tracked as AUTH-245) to prevent service disruption when tokens expire. The team plans to complete this implementation by the end of Q2 to align with the security roadmap.`
    } else if (query.toLowerCase().includes("work") || query.toLowerCase().includes("how")) {
      return `"${query}" involves a process where the Atlas API implements OAuth 2.0 for secure authentication. The system generates JWT tokens that expire after 1 hour and must be included in all API requests. The current implementation has some performance challenges with token validation, and the engineering team is working on a refresh mechanism to handle expiration more gracefully. This work is documented across several platforms, with code examples in GitHub and technical discussions in both Confluence and Slack.`
    } else {
      return `"${query}" relates to how the system handles authentication using OAuth 2.0 and JWT tokens. It involves technical implementation details like token generation and refresh mechanisms, which are actively being developed and tracked. There are also relevant discussions around integration choices and challenges, along with supporting code examples and project tasks that outline the overall workflow.`
    }
  }

  // Mock search results with technical context
  const generateMockResults = () => {
    return [
      {
        id: 1,
        title: "API Authentication Documentation",
        snippet:
          "```javascript\nconst jwt = require('jsonwebtoken');\nconst token = jwt.sign(payload, secretKey, { expiresIn: '1h' });\n```\nImplements OAuth 2.0 for secure API authentication. All requests must include a valid token...",
        source: "confluence",
        date: "2 days ago",
        author: "Michael Chen",
        url: "/documents/1",
        techStack: ["Node.js", "JWT", "OAuth"],
        type: "Documentation",
      },
      {
        id: 2,
        title: "Auth Service Refactoring",
        snippet:
          "We need to refactor the authentication service to support the new OAuth flow as discussed. The current implementation has performance issues with token validation.",
        source: "slack",
        date: "1 week ago",
        author: "Sarah Johnson",
        url: "/documents/2",
        techStack: ["Microservices", "OAuth"],
        type: "Discussion",
      },
      {
        id: 3,
        title: "Fix OAuth token refresh logic",
        snippet:
          "```typescript\nfunction refreshToken(oldToken: string): Promise<Token> {\n  // Current implementation doesn't handle token expiration correctly\n  // We need to implement proper refresh logic\n}\n```",
        source: "github",
        date: "3 days ago",
        author: "Alex Rodriguez",
        url: "/documents/3",
        techStack: ["TypeScript", "OAuth"],
        type: "Pull Request",
      },
      {
        id: 4,
        title: "AUTH-245: Implement token refresh mechanism",
        snippet:
          "Create a mechanism to automatically refresh expired OAuth tokens to prevent service disruption. Acceptance criteria: 1. Refresh before expiration 2. Handle failed refreshes 3. Maintain session state",
        source: "jira",
        date: "5 days ago",
        author: "You",
        url: "/documents/4",
        techStack: ["Backend", "Security"],
        type: "Task",
      },
      {
        id: 5,
        title: "Re: OAuth Implementation Timeline",
        snippet:
          "The OAuth implementation needs to be completed by the end of Q2 to align with the security roadmap. We should prioritize the refresh token mechanism as discussed in the architecture review.",
        source: "email",
        date: "1 day ago",
        author: "Jamie Smith",
        url: "/documents/5",
        techStack: ["Planning"],
        type: "Email",
      },
    ]
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Smart search across Confluence, Jira, Slack, GitHub, Email..."
            className="pl-10 pr-10 py-6 text-lg border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={clearSearch}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <Button
          className="ml-2 bg-emerald-600 hover:bg-emerald-700 py-6 px-4"
          onClick={handleSearch}
          disabled={isSearching || !searchQuery.trim()}
        >
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>

      {!searchQuery && !isSearching && (
        <div className="flex items-center bg-emerald-50 border border-emerald-100 rounded-lg p-3 mt-3 mb-2">
          <Sparkles className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-emerald-700">SageBase Smart Search</p>
            <p className="text-xs text-emerald-600 mt-1">
              SageBase understands context and finds relevant information across all your connected platforms, even when
              exact keywords don't match.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-500">Filter by source:</span>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={activeFilters.includes("confluence") ? "default" : "outline"}
            className={`cursor-pointer ${activeFilters.includes("confluence") ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : ""}`}
            onClick={() => toggleFilter("confluence")}
          >
            <Database className="h-3 w-3 mr-1" /> Confluence
          </Badge>
          <Badge
            variant={activeFilters.includes("jira") ? "default" : "outline"}
            className={`cursor-pointer ${activeFilters.includes("jira") ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : ""}`}
            onClick={() => toggleFilter("jira")}
          >
            <FileText className="h-3 w-3 mr-1" /> Jira
          </Badge>
          <Badge
            variant={activeFilters.includes("slack") ? "default" : "outline"}
            className={`cursor-pointer ${activeFilters.includes("slack") ? "bg-purple-100 text-purple-800 hover:bg-purple-200" : ""}`}
            onClick={() => toggleFilter("slack")}
          >
            <MessageSquare className="h-3 w-3 mr-1" /> Slack
          </Badge>
          <Badge
            variant={activeFilters.includes("teams") ? "default" : "outline"}
            className={`cursor-pointer ${activeFilters.includes("teams") ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : ""}`}
            onClick={() => toggleFilter("teams")}
          >
            <MessageSquare className="h-3 w-3 mr-1" /> Teams
          </Badge>
          <Badge
            variant={activeFilters.includes("github") ? "default" : "outline"}
            className={`cursor-pointer ${activeFilters.includes("github") ? "bg-gray-100 text-gray-800 hover:bg-gray-200" : ""}`}
            onClick={() => toggleFilter("github")}
          >
            <Code className="h-3 w-3 mr-1" /> GitHub
          </Badge>
          <Badge
            variant={activeFilters.includes("email") ? "default" : "outline"}
            className={`cursor-pointer ${activeFilters.includes("email") ? "bg-red-100 text-red-800 hover:bg-red-200" : ""}`}
            onClick={() => toggleFilter("email")}
          >
            <Mail className="h-3 w-3 mr-1" /> Email
          </Badge>
        </div>
      </div>

      {isSearching && (
        <div className="flex justify-center py-8">
          <div className="animate-pulse flex space-x-4">
            <div className="h-3 w-3 bg-emerald-400 rounded-full"></div>
            <div className="h-3 w-3 bg-emerald-400 rounded-full"></div>
            <div className="h-3 w-3 bg-emerald-400 rounded-full"></div>
          </div>
        </div>
      )}

      {searchResults.length > 0 && !isSearching && (
        <div>
          <div className="text-sm text-gray-500 mb-4">Response is based on {searchResults.length} documents</div>

          {/* Answer Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
            <p className="text-gray-700 leading-relaxed">{aiSummary}</p>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                onClick={() => setShowChat(true)}
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                Ask SageBase
              </Button>
            </div>
          </div>

          {/* Document Links Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-base font-medium text-gray-800 mb-3">References</h3>
            <div className="space-y-3">
              {searchResults
                .filter((result) => activeFilters.includes(result.source))
                .map((result) => (
                  <div
                    key={result.id}
                    className="flex items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0 mt-0.5 mr-3">{getSourceIcon(result.source)}</div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Link href={result.url} className="text-base font-medium text-gray-800 hover:text-emerald-600">
                          {result.title}
                        </Link>
                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {result.type}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span className="font-medium text-gray-600">{getSourceLabel(result.source)}</span>
                        <span className="mx-1.5">•</span>
                        <span>{result.date}</span>
                        <span className="mx-1.5">•</span>
                        <span>{result.author}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {result.techStack.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link href={result.url} className="flex-shrink-0 ml-2">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-emerald-600">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
            </div>

            <div className="mt-4 text-right">
              <Button variant="outline" size="sm" className="text-sm text-emerald-600">
                View All Results <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {searchQuery && searchResults.length === 0 && !isSearching && (
        <div className="text-center py-8">
          <p className="text-gray-500">No results found for "{searchQuery}"</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms or filters</p>
        </div>
      )}

      {!searchQuery && !isSearching && (
        <div className="text-center py-8 text-gray-500">
          <p>AI Search Across All Platforms</p>
          <p className="text-sm text-gray-400 mt-1">Find knowledge from Confluence, Jira, Slack, GitHub, and Email</p>
        </div>
      )}

      {showChat && (
        <ChatInterface
          initialContext={`Based on your search for "${searchQuery}", I found information about ${aiSummary.substring(0, 100)}... What would you like to know more about?`}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  )
}
