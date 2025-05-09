"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, Database, FileText, MessageSquare, Code, Mail, X, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function SimplifiedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Track active filters
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "confluence",
    "jira",
    "slack",
    "teams",
    "github",
    "email",
  ])

  // Mock search results
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [aiSummary, setAiSummary] = useState("")

  // Toggle filter selection
  const toggleFilter = (filterId: string) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter((id) => id !== filterId))
    } else {
      setActiveFilters([...activeFilters, filterId])
    }
  }

  // Mock search history - in a real app, this would come from localStorage or a database
  const [searchHistory] = useState([
    "Authentication service architecture",
    "How to implement OAuth in Atlas API?",
    "Token refresh mechanism documentation",
    "API rate limiting best practices",
    "WebSocket connection debugging in Pulse",
    "Nova frontend error handling",
    "CI/CD pipeline setup for Pulse",
  ])

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setShowHistory(false)

    // Simulate search delay
    setTimeout(() => {
      // Generate mock results based on the query
      const results = generateMockResults()
      setSearchResults(results)

      // Generate AI summary
      const summary = generateAiSummary(results, searchQuery)
      setAiSummary(summary)

      setIsSearching(false)
      setShowResults(true)
      setShowChat(true)

      // Add initial AI message to chat
      setChatMessages([
        {
          text: `SageBase found an answer to your question about "${searchQuery}". Is there anything specific you'd like explained further?`,
          isUser: false,
        },
      ])
    }, 1000)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    // Add user message
    setChatMessages([...chatMessages, { text: chatInput, isUser: true }])
    const userQuestion = chatInput
    setChatInput("")

    // Show AI is typing
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          text: generateAiResponse(userQuestion),
          isUser: false,
        },
      ])
      setIsTyping(false)
    }, 1500)
  }

  const handleHistoryItemClick = (query: string) => {
    setSearchQuery(query)
    setShowHistory(false)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
    // Trigger search immediately
    setTimeout(() => handleSearch(), 100)
  }

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages, isTyping])

  // Close history dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        historyRef.current &&
        !historyRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Show history when input is focused and has content
  useEffect(() => {
    if (isFocused && !showResults) {
      setShowHistory(true)
    }
  }, [isFocused, searchQuery, showResults])

  // Reset search
  const resetSearch = () => {
    setSearchQuery("")
    setShowResults(false)
    setShowChat(false)
    setChatMessages([])
    setSearchResults([])
    setAiSummary("")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  const platforms = [
    {
      id: "confluence",
      name: "Confluence",
      icon: <Database className="h-4 w-4" />,
      activeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      inactiveColor: "bg-gray-50 text-gray-500 border-gray-200",
    },
    {
      id: "jira",
      name: "Jira",
      icon: <FileText className="h-4 w-4" />,
      activeColor: "bg-blue-100 text-blue-800 border-blue-200",
      inactiveColor: "bg-gray-50 text-gray-500 border-gray-200",
    },
    {
      id: "slack",
      name: "Slack",
      icon: <MessageSquare className="h-4 w-4" />,
      activeColor: "bg-purple-100 text-purple-800 border-purple-200",
      inactiveColor: "bg-gray-50 text-gray-500 border-gray-200",
    },
    {
      id: "teams",
      name: "Teams",
      icon: <MessageSquare className="h-4 w-4" />,
      activeColor: "bg-blue-100 text-blue-800 border-blue-200",
      inactiveColor: "bg-gray-50 text-gray-500 border-gray-200",
    },
    {
      id: "github",
      name: "GitHub",
      icon: <Code className="h-4 w-4" />,
      activeColor: "bg-gray-100 text-gray-800 border-gray-200",
      inactiveColor: "bg-gray-50 text-gray-500 border-gray-200",
    },
    {
      id: "email",
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      activeColor: "bg-red-100 text-red-800 border-red-200",
      inactiveColor: "bg-gray-50 text-gray-500 border-gray-200",
    },
  ]

  // Mock search results with technical context
  const generateMockResults = () => {
    return [
      {
        id: 1,
        title: "API Authentication Documentation",
        snippet: "Implements OAuth 2.0 for secure API authentication. All requests must include a valid token...",
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
          "Current implementation doesn't handle token expiration correctly. We need to implement proper refresh logic.",
        source: "github",
        date: "3 days ago",
        author: "Alex Rodriguez",
        url: "/documents/3",
        techStack: ["TypeScript", "OAuth"],
        type: "Pull Request",
      },
    ]
  }

  // Generate AI summary based on search results
  const generateAiSummary = (results: any[], query: string) => {
    // Check if the query is a question
    const isQuestion =
      query.trim().endsWith("?") ||
      query.toLowerCase().startsWith("how") ||
      query.toLowerCase().startsWith("what") ||
      query.toLowerCase().startsWith("why") ||
      query.toLowerCase().startsWith("when") ||
      query.toLowerCase().startsWith("where") ||
      query.toLowerCase().startsWith("which") ||
      query.toLowerCase().startsWith("who") ||
      query.toLowerCase().startsWith("can")

    if (query.toLowerCase().includes("authentication") || query.toLowerCase().includes("auth")) {
      return `The system uses OAuth 2.0 with JWT tokens for authentication. Tokens expire after 1 hour and must be included in the Authorization header of all API requests. There's an ongoing project to implement a refresh mechanism to handle token expiration more gracefully.`
    } else if (query.toLowerCase().includes("token") || query.toLowerCase().includes("jwt")) {
      return `JWT tokens are generated using the jsonwebtoken library with a 1-hour expiration. The tokens must be included in the Authorization header of all API requests. The current implementation has some performance issues with token validation that the team is working to address.`
    } else if (query.toLowerCase().includes("timeline") || query.toLowerCase().includes("deadline")) {
      return `The OAuth implementation needs to be completed by the end of Q2 to align with the security roadmap. The refresh token mechanism is being prioritized based on the architecture review discussions.`
    } else if (query.toLowerCase().includes("api") || query.toLowerCase().includes("endpoint")) {
      return `The API authentication uses OAuth 2.0 for secure access. All endpoints require a valid JWT token in the Authorization header. The documentation includes examples for token generation and usage across different services.`
    } else if (isQuestion) {
      // Provide a more direct answer for questions
      return `Based on the available information, ${query.replace(/\?$/, "")} involves the authentication system that uses OAuth 2.0 with JWT tokens. The implementation details are documented across several platforms, with specific code examples available in the GitHub repository.`
    } else {
      // For non-questions or unrecognized queries, provide a more helpful response
      return `"${query}" appears to be related to our technical documentation. The most relevant information comes from our authentication system documentation, which describes OAuth 2.0 implementation and JWT token usage. Would you like more specific details about any particular aspect?`
    }
  }

  // Generate AI response for chat
  const generateAiResponse = (question: string) => {
    if (question.toLowerCase().includes("token") || question.toLowerCase().includes("jwt")) {
      return "JWT tokens are generated using the jsonwebtoken library with a 1-hour expiration. The tokens must be included in the Authorization header of all API requests. The current implementation has some performance issues with token validation that the team is working to address."
    } else if (question.toLowerCase().includes("timeline") || question.toLowerCase().includes("deadline")) {
      return "According to the latest information, the OAuth implementation needs to be completed by the end of Q2 to align with the security roadmap. The refresh token mechanism is being prioritized based on the architecture review discussions."
    } else {
      return "Based on the search results, I can see that this relates to the authentication system using OAuth 2.0 and JWT tokens. There are ongoing efforts to improve the token refresh mechanism. Can you specify what aspect you'd like to know more about?"
    }
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Search Input */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Ask anything..."
            className="pl-10 pr-10 py-6 text-lg border-gray-300 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            disabled={isSearching || showResults}
          />
          {searchQuery && !showResults && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-5 w-5" />
            </button>
          )}
          {showResults && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={resetSearch}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Search History Dropdown */}
        {showHistory && searchHistory.length > 0 && !showResults && (
          <div
            ref={historyRef}
            className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto"
          >
            <ul className="py-1">
              {searchHistory.map((query, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleHistoryItemClick(query)}
                >
                  <Search className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-700">{query}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Platform Filters */}
        {!showResults && (
          <div className="flex items-center space-x-3 mt-4">
            <span className="text-sm font-medium text-gray-600">Filter by source:</span>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Badge
                  key={platform.id}
                  variant="outline"
                  className={`cursor-pointer transition-colors duration-200 ${
                    activeFilters.includes(platform.id) ? platform.activeColor : platform.inactiveColor
                  }`}
                  onClick={() => toggleFilter(platform.id)}
                >
                  {platform.icon}
                  <span className="ml-1">{platform.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="flex justify-center py-8">
          <div className="animate-pulse flex space-x-4">
            <div className="h-3 w-3 bg-emerald-400 rounded-full"></div>
            <div className="h-3 w-3 bg-emerald-400 rounded-full"></div>
            <div className="h-3 w-3 bg-emerald-400 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {showResults && !isSearching && (
        <div ref={resultsRef} className="p-4">
          {/* AI Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-gray-700">{aiSummary}</p>
          </div>

          {/* References */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">References:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {searchResults
                .filter((result) => activeFilters.includes(result.source))
                .map((result) => (
                  <Link href={result.url} key={result.id}>
                    <div className="bg-gray-50 rounded-lg p-3 h-full hover:bg-gray-100 transition-colors">
                      <div className="flex items-center mb-2">
                        <div className="flex-shrink-0 mr-2">{getSourceIcon(result.source)}</div>
                        <span className="text-sm font-medium text-gray-600">{getSourceLabel(result.source)}</span>
                      </div>
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{result.title}</h4>
                      <div className="text-xs text-gray-500">{result.author}</div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {showChat && (
        <div className="border-t border-gray-200 p-4">
          {/* Chat Messages */}
          <div className="max-h-60 overflow-y-auto mb-4 space-y-4">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div className="flex max-w-[80%]">
                  {!message.isUser && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarFallback className="bg-emerald-100 text-emerald-600">SB</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.isUser ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-emerald-100 text-emerald-600">SB</AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="flex items-center">
            <Input
              ref={chatInputRef}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="flex-1 mr-2"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!chatInput.trim() || isTyping}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Empty State */}
      {!showResults && !isSearching && (
        <div className="text-center py-8 px-4 text-gray-500">
          <p className="text-lg font-medium text-gray-700 mb-2">
            {activeFilters.length === platforms.length
              ? "AI Search Across All Platforms"
              : activeFilters.length === 0
                ? "Select Platforms to Search"
                : "AI Search Across Selected Platforms"}
          </p>
          <p className="text-gray-500">
            {activeFilters.length === 0
              ? "Please select at least one platform to search"
              : `Find knowledge from ${activeFilters
                  .map((id) => platforms.find((p) => p.id === id)?.name)
                  .filter(Boolean)
                  .join(", ")
                  .replace(/,([^,]*)$/, " and$1")}`}
          </p>
        </div>
      )}
    </div>
  )
}
