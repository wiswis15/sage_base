"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Send, X, Maximize2, Minimize2, ChevronDown, ChevronUp } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type ChatInterfaceProps = {
  initialContext?: string
  onClose?: () => void
}

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

export default function ChatInterface({ initialContext, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: initialContext || "Hello! I'm your AI assistant. How can I help you with your search?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Add this inside the component, after the state declarations
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

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call our API route - same as the Teams chat modal
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: input,
          conversationHistory: messages
            .slice(-5)
            .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
            .join("\n\n"),
        }),
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()

      // Add the response to messages
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm sorry, I couldn't generate a response at this time.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)

      // Add a fallback message when the API fails
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Simple mock AI response generator
  const generateAIResponse = (query: string): string => {
    if (query.toLowerCase().includes("authentication") || query.toLowerCase().includes("auth")) {
      return "The authentication system uses OAuth 2.0 with JWT tokens. The tokens expire after 1 hour, and there's an ongoing project (AUTH-245) to implement a refresh mechanism. Would you like more details about a specific aspect of the authentication flow?"
    } else if (query.toLowerCase().includes("token") || query.toLowerCase().includes("jwt")) {
      return "JWT tokens are generated using the jsonwebtoken library with a 1-hour expiration. The tokens must be included in the Authorization header of all API requests. The current implementation has some performance issues with token validation that the team is working to address."
    } else if (query.toLowerCase().includes("timeline") || query.toLowerCase().includes("deadline")) {
      return "According to the latest information, the OAuth implementation needs to be completed by the end of Q2 to align with the security roadmap. The refresh token mechanism is being prioritized based on the architecture review discussions."
    } else {
      return "Based on the search results, I can see that this relates to the authentication system using OAuth 2.0 and JWT tokens. There are ongoing efforts to improve the token refresh mechanism. Can you specify what aspect you'd like to know more about?"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
    if (isMinimized) setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 z-50 flex flex-col ${
        isExpanded ? "w-[600px] h-[500px]" : isMinimized ? "w-64 h-12" : "w-80 h-96"
      }`}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-emerald-50">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-emerald-600 mr-2" />
          <h3 className="font-medium text-emerald-700">SageBase Assistant</h3>
        </div>
        <div className="flex items-center space-x-1">
          {!isMinimized && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-gray-500 hover:text-gray-700"
              onClick={toggleExpand}
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-500 hover:text-gray-700"
            onClick={toggleMinimize}
          >
            {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500 hover:text-gray-700" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      {!isMinimized && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex max-w-[80%]">
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarFallback className="bg-emerald-100 text-emerald-600">SB</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-emerald-600 text-white"
                      : index === 0
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div
                    className={`text-sm chat-message-content ${
                      message.role === "user" || index === 0 ? "text-white" : "text-gray-800"
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                  <div
                    className={`text-xs mt-1 ${
                      message.role === "user" ? "text-emerald-100" : index === 0 ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
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
      )}

      {/* Chat Input */}
      {!isMinimized && (
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 mr-2"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
