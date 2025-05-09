"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, X } from "lucide-react"

type AIAssistButtonProps = {
  onInsertContent: (content: string) => void
}

export default function AIAssistButton({ onInsertContent }: AIAssistButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const generatedSuggestions = [
        generateSuggestionBasedOnPrompt(prompt, 1),
        generateSuggestionBasedOnPrompt(prompt, 2),
        generateSuggestionBasedOnPrompt(prompt, 3),
      ]

      setSuggestions(generatedSuggestions)
      setIsGenerating(false)
    }, 1500)
  }

  const generateSuggestionBasedOnPrompt = (userPrompt: string, variant: number) => {
    // This is a simplified mock implementation
    // In a real app, this would call an actual AI model

    if (userPrompt.toLowerCase().includes("introduction")) {
      return variant === 1
        ? "<p>This document provides a comprehensive overview of our system architecture, detailing the key components and their interactions.</p>"
        : variant === 2
          ? "<p>Welcome to our system documentation. This guide will walk you through the fundamental aspects of our architecture and implementation details.</p>"
          : "<p>In this document, we explore the technical foundation of our platform, offering insights into its design principles and operational mechanics.</p>"
    }

    if (userPrompt.toLowerCase().includes("conclusion")) {
      return variant === 1
        ? "<p>In conclusion, the system architecture described above provides a robust foundation for our current needs while allowing for future scalability and feature expansion.</p>"
        : variant === 2
          ? "<p>To summarize, we've outlined the core components of our system, their interactions, and the principles guiding our technical decisions.</p>"
          : "<p>Moving forward, this architectural approach will enable us to maintain performance while accommodating the evolving requirements of our platform.</p>"
    }

    // Default responses for other prompts
    return variant === 1
      ? `<p>Here's some AI-generated content about "${userPrompt}". This is the first variation that provides a concise and informative perspective.</p>`
      : variant === 2
        ? `<p>This AI-generated content addresses "${userPrompt}" with a more detailed analysis and comprehensive explanation.</p>`
        : `<p>The third variation of AI-generated content for "${userPrompt}" offers an alternative approach with different emphasis and structure.</p>`
  }

  const applySuggestion = (suggestion: string) => {
    onInsertContent(suggestion)
    setIsOpen(false)
    setPrompt("")
    setSuggestions([])
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="bg-white text-purple-600 border-purple-200 hover:bg-purple-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Sparkles className="mr-1.5 h-4 w-4" />
        AI Assist
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">AI Writing Assistant</h3>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-3">
            <div className="mb-3">
              <label htmlFor="ai-prompt" className="block text-xs font-medium text-gray-700 mb-1">
                What would you like the AI to help with?
              </label>
              <textarea
                id="ai-prompt"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Write an introduction, Generate a conclusion, Explain a concept..."
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 mb-3"
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Content"}
            </Button>

            {suggestions.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-medium text-gray-700">AI Suggestions:</h4>
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-purple-50 border border-purple-100 rounded-md p-2">
                    <div className="text-xs text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: suggestion }} />
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                        onClick={() => applySuggestion(suggestion)}
                      >
                        Insert <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
