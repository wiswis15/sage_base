"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search, Database, FileText, MessageSquare, Code, Mail, X, Send, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"
import SageBaseLogo from "./sagebase-logo"
import HtmlResponse from "./html-response"

// Add the chat message styles
const chatMessageStyles = `
  .chat-message-content a {
    color: #10b981;
    text-decoration: underline;
    transition: color 0.2s;
  }
  
  .chat-message-content a:hover {
    color: #059669;
  }
  
  .chat-message-content ul, .chat-message-content ol {
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .chat-message-content ul {
    list-style-type: disc;
  }
  
  .chat-message-content ol {
    list-style-type: decimal;
  }
  
  .chat-message-content p {
    margin-bottom: 0.5rem;
  }
  
  .chat-message-content p:last-child {
    margin-bottom: 0;
  }
  
  .chat-message-content pre {
    background-color: #f1f1f1;
    padding: 0.5rem;
    border-radius: 0.25rem;
    overflow-x: auto;
    margin: 0.5rem 0;
  }
  
  .chat-message-content code {
    font-family: monospace;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;
  }
  
  .chat-message-content div {
    margin-bottom: 0.5rem;
  }
  
  .chat-message-content div:last-child {
    margin-bottom: 0;
  }
`

export default function SimplifiedSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const historyRef = useRef<HTMLDivElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
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

  // Add a new state for tracking progress:
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Add effect to apply chat message styles
  useEffect(() => {
    // Add the styles to the document
    const styleElement = document.createElement("style")
    styleElement.innerHTML = chatMessageStyles
    document.head.appendChild(styleElement)

    // Clean up on unmount
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

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

  // Mock question suggestions based on input
  const getSuggestions = (input: string): string[] => {
    if (!input.trim()) return []

    const lowercaseInput = input.toLowerCase()

    // IMPORTANT: This is the updated suggestions list with the CHR2 question at the top
    const suggestions = [
      "How to update the software of my device CHR2?",
      "How does the authentication service work?",
      "What is the token refresh mechanism?",
      "How to implement OAuth in our services?",
      "How to handle token expiration?",
    ]

    return suggestions.filter((suggestion) => suggestion.toLowerCase().includes(lowercaseInput)).slice(0, 5) // Return top 5 matches
  }

  // Get filtered suggestions based on current input
  const filteredSuggestions = getSuggestions(searchQuery)

  // Modified handleSearch function
  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setShowHistory(false)
    setShowSuggestions(false)

    // Reset and start progress animation
    setLoadingProgress(0)
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        // Simulate progress up to 90% - the last 10% will complete when data is received
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 10
      })
    }, 300)

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

      // Generate mock results based on the query
      const results = generateMockResults()
      setSearchResults(results)

      // Use the API response as the AI summary
      setAiSummary(data.response || generateAiSummary(results, searchQuery))

      // Complete the progress bar
      setLoadingProgress(100)
      clearInterval(progressInterval)

      // Short delay to show the completed progress bar before showing results
      setTimeout(() => {
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
      }, 500)
    } catch (error) {
      console.error("Error in search:", error)

      // Complete the progress bar even on error
      setLoadingProgress(100)
      clearInterval(progressInterval)

      setTimeout(() => {
        // Fallback to local generation if API fails
        const results = generateMockResults()
        setSearchResults(results)
        setAiSummary(generateAiSummary(results, searchQuery))

        setIsSearching(false)
        setShowResults(true)
        setShowChat(true)

        setChatMessages([
          {
            text: `SageBase found an answer to your question about "${searchQuery}". Is there anything specific you'd like explained further?`,
            isUser: false,
          },
        ])
      }, 500)
    }
  }

  // Replace the existing handleChatSubmit function with this one:
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    // Add user message
    setChatMessages([...chatMessages, { text: chatInput, isUser: true }])
    const userQuestion = chatInput
    setChatInput("")

    // Show AI is typing
    setIsTyping(true)

    try {
      // Call our API route - same as the Teams chat modal
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userQuestion,
          conversationHistory: chatMessages
            .map((msg) => `${msg.isUser ? "User" : "Assistant"}: ${msg.text}`)
            .join("\n\n"),
        }),
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()

      // Add the response to messages
      setChatMessages((prev) => [
        ...prev,
        {
          text: data.response || "I'm sorry, I couldn't generate a response at this time.",
          isUser: false,
        },
      ])
    } catch (error) {
      console.error("Error generating response:", error)

      // Add a fallback message when the API fails
      setChatMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I encountered an error processing your request. Please try again later.",
          isUser: false,
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleHistoryItemClick = (query: string) => {
    setSearchQuery(query)
    setShowHistory(false)
    setShowSuggestions(false)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
    // Trigger search immediately
    setTimeout(() => handleSearch(), 100)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
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
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false)
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Show history or suggestions when input is focused
  useEffect(() => {
    if (isFocused && !showResults) {
      if (searchQuery.trim() === "") {
        setShowHistory(true)
        setShowSuggestions(false)
      } else if (filteredSuggestions.length > 0) {
        setShowSuggestions(true)
        setShowHistory(false)
      } else {
        setShowSuggestions(false)
        setShowHistory(true)
      }
    }
  }, [isFocused, searchQuery, showResults, filteredSuggestions])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    if (value.trim() === "") {
      setShowSuggestions(false)
      setShowHistory(true)
    } else if (filteredSuggestions.length > 0) {
      setShowSuggestions(true)
      setShowHistory(false)
    } else {
      setShowSuggestions(false)
      setShowHistory(false)
    }
  }

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
      return `<div>
      <p>JWT tokens are generated using the jsonwebtoken library with a 1-hour expiration. The tokens must be included in the Authorization header of all API requests.</p>
      <p>The current implementation has some performance issues with token validation that the team is working to address:</p>
      <ul>
        <li>High CPU usage during validation</li>
        <li>Occasional timeouts with high traffic</li>
        <li>No proper refresh mechanism</li>
      </ul>
      <p>You can find more details in the <a href="#">Authentication Service Documentation</a>.</p>
    </div>`
    } else if (question.toLowerCase().includes("timeline") || question.toLowerCase().includes("deadline")) {
      return `<div>
      <p>According to the latest information, the OAuth implementation needs to be completed by the end of Q2 to align with the security roadmap.</p>
      <p>Key milestones:</p>
      <ul>
        <li><strong>April 15:</strong> Design review completed</li>
        <li><strong>May 30:</strong> Implementation of refresh token mechanism</li>
        <li><strong>June 15:</strong> Testing and QA</li>
        <li><strong>June 30:</strong> Production deployment</li>
      </ul>
      <p>The refresh token mechanism is being prioritized based on the architecture review discussions.</p>
    </div>`
    } else {
      return `<div>
      <p>Based on the search results, I can see that this relates to the authentication system using OAuth 2.0 and JWT tokens. There are ongoing efforts to improve the token refresh mechanism.</p>
      <p>The system currently:</p>
      <ul>
        <li>Uses OAuth 2.0 for authentication</li>
        <li>Implements JWT tokens with 1-hour expiration</li>
        <li>Requires tokens in the Authorization header</li>
      </ul>
      <p>Can you specify what aspect you'd like to know more about?</p>
    </div>`
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-h-[80vh] overflow-auto">
      {/* Search Input */}
      <div className="p-4 border-b border-gray-200">
        {/* ... existing search input code ... */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Ask anything..."
            className={`pl-10 pr-10 py-6 text-lg border-gray-300 w-full ${showResults ? "bg-gray-50" : ""}`}
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && !showResults && handleSearch()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            readOnly={showResults}
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

        {/* Question Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && !showResults && (
          <div
            ref={suggestionsRef}
            className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto"
          >
            <ul className="py-1">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search className="h-4 w-4 text-emerald-500 mr-2" />
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Search History Dropdown */}
        {showHistory && searchHistory.length > 0 && !showResults && !showSuggestions && (
          <div
            ref={historyRef}
            className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto"
          >
            <div className="px-4 py-2 text-sm font-medium text-gray-500 border-b border-gray-100">Recent searches</div>
            <ul className="py-1">
              {searchHistory.map((query, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleHistoryItemClick(query)}
                >
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-700">{query}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ... existing filter code ... */}
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
        <div className="p-8">
          <div className="mb-4 text-center">
            <p className="text-gray-700 mb-2">Searching for "{searchQuery}"</p>
            <p className="text-sm text-gray-500">Analyzing documents across platforms...</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-center items-center space-x-2 text-xs text-gray-500">
            {loadingProgress < 30 && <p>Finding relevant documents...</p>}
            {loadingProgress >= 30 && loadingProgress < 60 && <p>Analyzing content...</p>}
            {loadingProgress >= 60 && loadingProgress < 90 && <p>Generating response...</p>}
            {loadingProgress >= 90 && <p>Almost ready...</p>}
          </div>
        </div>
      )}

      {/* Search Results - Updated to use HtmlResponse */}
      {showResults && !isSearching && (
        <div ref={resultsRef} className="max-h-[60vh] overflow-y-auto">
          {/* Question Label - Make it sticky */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10 shadow-sm">
            <div className="text-sm font-medium text-gray-500 mb-1">Your question:</div>
            <div className="text-base font-medium text-gray-800">{searchQuery}</div>
          </div>

          {/* AI Summary - Now using HtmlResponse component */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 mt-2 mx-4">
            <HtmlResponse content={aiSummary} className="text-gray-700" />
          </div>

          {/* References */}
          <div className="mb-4 px-4">
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

      {/* Chat Interface - Updated to use HtmlResponse */}
      {showChat && (
        <div className="border-t border-gray-200 p-4">
          {/* Chat Messages */}
          <div className="max-h-60 overflow-y-auto mb-4 space-y-4">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                <div className="flex max-w-[80%]">
                  {!message.isUser && (
                    <Avatar className="h-8 w-8 mr-2 mt-1 bg-emerald-100">
                      <SageBaseLogo size={20} className="text-emerald-600" variant="icon" />
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.isUser
                        ? "bg-emerald-600 text-white"
                        : index === 0
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div
                      className={`text-sm chat-message-content ${
                        message.isUser || (index === 0 && !message.isUser) ? "text-white" : "text-gray-800"
                      }`}
                    >
                      <HtmlResponse
                        content={message.text}
                        className={message.isUser || (index === 0 && !message.isUser) ? "text-white" : "text-gray-800"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex">
                  <Avatar className="h-8 w-8 mr-2 bg-emerald-100">
                    <SageBaseLogo size={20} className="text-emerald-600" variant="icon" />
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
