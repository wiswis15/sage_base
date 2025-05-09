"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

export default function AIFeatures() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState("")

  const generateSampleText = async () => {
    setIsGenerating(true)
    try {
      // This is a mock implementation since we can't actually call the AI in this preview
      // In a real implementation, you would use the AI SDK
      setTimeout(() => {
        setGeneratedText(
          "The AI has analyzed the current document and suggests adding a section about implementation details. This would help clarify the technical approach and provide context for developers who will be working on this feature.",
        )
        setIsGenerating(false)
      }, 1500)

      // Real implementation would look like:
      // const { text } = await generateText({
      //   model: openai("gpt-4o"),
      //   prompt: "Analyze this document and suggest improvements",
      // });
      // setGeneratedText(text);
    } catch (error) {
      console.error("Error generating text:", error)
    } finally {
      // setIsGenerating(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant="outline" size="sm" className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          Summarize
        </Button>
        <Button variant="outline" size="sm" className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          Improve writing
        </Button>
        <Button variant="outline" size="sm" className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          Generate table
        </Button>
      </div>

      {!generatedText ? (
        <Button
          onClick={generateSampleText}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              Generating<span className="loading-dots">...</span>
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Try AI Suggestions
            </>
          )}
        </Button>
      ) : (
        <div className="bg-white p-3 rounded-lg border border-purple-200 text-sm text-gray-700">
          <p>{generatedText}</p>
          <div className="flex justify-end mt-2">
            <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
              Apply <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
