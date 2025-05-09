"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { X, Send, Paperclip, Smile, Maximize2, Minimize2, MessageSquare } from "lucide-react"
import SageBaseLogo from "./sagebase-logo"

// Add this style block right before the TeamsChatModal component definition
const chatMessageStyles = `
  .chat-message-content a {
    color: #464775;
    text-decoration: underline;
    transition: color 0.2s;
  }
  
  .chat-message-content a:hover {
    color: #5b5c8d;
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

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type TeamsChatModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function TeamsChatModal({ isOpen, onClose }: TeamsChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm SageBase for Microsoft Teams. Ask me anything about your company's knowledge base.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Add this inside the TeamsChatModal component, before the return statement
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
    setIsTyping(true)

    try {
      // Check for documentation update requests first (special case)
      if (input.toLowerCase().includes("update the documentation with")) {
        const docTitle = "Authentication Flow Documentation"
        const docId = "auth-flow-123"
        const response = `✅ Documentation has been successfully updated!

The changes have been applied to <a href="#" class="text-[#464775] underline hover:text-[#5b5c8d]">${docTitle}</a> and all team members have been notified of the changes.

You can <a href="#" class="text-[#464775] underline hover:text-[#5b5c8d]">view the updated document</a> or <a href="#" class="text-[#464775] underline hover:text-[#5b5c8d]">see what changed</a>.`

        setTimeout(() => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: response,
            role: "assistant",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, assistantMessage])
          setIsTyping(false)
        }, 1500)
      } else {
        // For all other queries, use OpenAI via our API route
        await callOpenAI(input, messages)
      }
    } catch (error) {
      console.error("Error generating response:", error)

      // Fallback response in case of error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  // Function to call OpenAI API via our API route
  const callOpenAI = async (query: string, messageHistory: Message[]) => {
    // Format the conversation history for the prompt
    const recentMessages = messageHistory.slice(-5)
    const conversationHistory = recentMessages
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n\n")

    try {
      // Call our API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          conversationHistory,
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

      // If the response doesn't already have HTML formatting, wrap it in paragraph tags
      if (data.response && !data.response.includes("<")) {
        assistantMessage.content = `<p>${data.response}</p>`
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    } catch (error) {
      console.error("API error:", error)

      // Add a fallback message when the API fails
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error processing your request. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isFullscreen ? "" : "bg-black/50"
      } transition-all duration-200`}
    >
      <div
        className={`bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transition-all duration-200 ${
          isFullscreen ? "fixed inset-0 rounded-none" : "w-[800px] max-w-[90vw] h-[600px] max-h-[90vh]"
        }`}
      >
        {/* Teams Header */}
        <div className="bg-[#464775] text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <div className="flex items-center">
              <SageBaseLogo size={24} className="text-white" variant="icon" />
              <span className="ml-2 font-medium">SageBase</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Teams Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f5f5f5] space-y-4">
          {messages.map((message, index) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex max-w-[70%]">
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 bg-emerald-100">
                    <SageBaseLogo size={20} className="text-emerald-600" variant="icon" />
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-[#464775] text-white"
                      : index === 0
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 shadow-sm"
                  }`}
                >
                  <div
                    className={`text-sm chat-message-content ${
                      message.role === "user" || (index === 0 && message.role === "assistant")
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  />
                  <div
                    className={`text-xs mt-1 ${
                      message.role === "user" ? "text-white/70" : index === 0 ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 ml-2 mt-1">
                    <AvatarFallback className="bg-blue-100 text-blue-600">YO</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex">
                <Avatar className="h-8 w-8 mr-2 bg-emerald-100">
                  <SageBaseLogo size={20} className="text-emerald-600" variant="icon" />
                </Avatar>
                <div className="bg-white rounded-lg p-3 shadow-sm flex items-center">
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

        {/* Teams Input Area */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a new message"
              className="flex-1 mx-2 border-gray-300 focus-visible:ring-[#464775]"
              disabled={isTyping}
            />
            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 mr-1">
              <Smile className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              size="icon"
              className="h-9 w-9 bg-[#464775] hover:bg-[#5b5c8d] text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
