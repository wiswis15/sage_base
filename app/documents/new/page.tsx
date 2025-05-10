"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  LinkIcon,
  Table,
  AlignLeft,
  Sparkles,
  Save,
  ArrowLeft,
  Zap,
} from "lucide-react"
import SideNavigation from "@/components/side-navigation"

export default function NewDocumentPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [space, setSpace] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  const generateWithAI = () => {
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      setAiSuggestions([
        "Add a section about authentication methods with code examples",
        "Include API endpoints documentation with request/response samples",
        "Add a troubleshooting section for common integration issues",
        "Include deployment instructions for different environments",
      ])
      setIsGenerating(false)
    }, 1500)
  }

  const applySuggestion = (suggestion: string) => {
    // In a real app, this would generate the actual content
    // For this demo, we'll just append the suggestion as a heading
    setContent((prev) => `${prev}\n\n## ${suggestion}\n\nContent for this section goes here...`)
    setAiSuggestions([])
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <SideNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-emerald-600">SageBase</h1>
              <nav className="hidden md:flex items-center space-x-1">
                <Button variant="ghost" className="text-sm">
                  Spaces
                </Button>
                <Button variant="ghost" className="text-sm">
                  Teams
                </Button>
                <Button variant="ghost" className="text-sm">
                  Integrations
                </Button>
              </nav>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back to Dashboard
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="mr-1.5 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        </header>

        {/* Document Editor */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Document Title"
                  className="text-2xl font-bold border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-emerald-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-24">
                    <span className="text-sm text-gray-500">Space</span>
                  </div>
                  <div className="flex-1">
                    <Select value={space} onValueChange={setSpace}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a space" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="atlas">Atlas</SelectItem>
                        <SelectItem value="nova">Nova</SelectItem>
                        <SelectItem value="pulse">Pulse</SelectItem>
                        <SelectItem value="sentinel">Sentinel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Editor Toolbar */}
              <div className="border border-gray-200 rounded-t-lg px-4 py-1.5 bg-gray-50">
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <div className="h-4 w-px bg-gray-300 mx-1"></div>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <div className="h-4 w-px bg-gray-300 mx-1"></div>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Table className="h-4 w-4" />
                  </Button>
                  <div className="h-4 w-px bg-gray-300 mx-1"></div>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex-1"></div>
                  <Button
                    onClick={generateWithAI}
                    disabled={isGenerating}
                    variant="outline"
                    size="sm"
                    className="h-8 bg-white text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                  >
                    <Sparkles className="mr-1.5 h-4 w-4" />
                    AI Assist
                  </Button>
                </div>
              </div>

              {/* Editor Content */}
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[400px] border-t-0 rounded-t-none focus-visible:ring-0 focus-visible:border-emerald-500"
                placeholder="Start writing or use AI to generate content..."
              />

              {/* AI Suggestions */}
              {isGenerating && (
                <div className="mt-4 p-4 border border-emerald-200 rounded-lg bg-emerald-50">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-emerald-500 mr-2" />
                    <span className="text-emerald-700 font-medium">AI is analyzing your document...</span>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse delay-100"></div>
                    <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              )}

              {aiSuggestions.length > 0 && (
                <div className="mt-4 p-4 border border-emerald-200 rounded-lg bg-emerald-50">
                  <div className="flex items-center mb-3">
                    <Sparkles className="h-5 w-5 text-emerald-500 mr-2" />
                    <span className="text-emerald-700 font-medium">AI Suggestions</span>
                  </div>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-2 rounded border border-emerald-100"
                      >
                        <span className="text-gray-700">{suggestion}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => applySuggestion(suggestion)}
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                          Apply
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Context */}
      <div className="w-64 border-l border-gray-200 bg-white hidden lg:block">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-800">Related Knowledge</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <Zap className="h-4 w-4 text-emerald-500 mr-1.5" />
                <span className="text-xs font-medium text-gray-700">Code References</span>
              </div>
              <p className="text-xs text-gray-600">Related code repositories and technical documentation:</p>
              <ul className="mt-2 space-y-2">
                <li className="text-xs">
                  <a href="#" className="text-emerald-600 hover:underline">
                    GitHub: auth-service (main)
                  </a>
                  <p className="text-gray-500 mt-0.5">Last updated 2 days ago</p>
                </li>
                <li className="text-xs">
                  <a href="#" className="text-emerald-600 hover:underline">
                    Swagger: API Documentation
                  </a>
                  <p className="text-gray-500 mt-0.5">v2.3.1</p>
                </li>
                <li className="text-xs">
                  <a href="#" className="text-emerald-600 hover:underline">
                    Architecture Decision Record: JWT Implementation
                  </a>
                  <p className="text-gray-500 mt-0.5">Created by Michael Chen</p>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <Zap className="h-4 w-4 text-emerald-500 mr-1.5" />
                <span className="text-xs font-medium text-gray-700">Technical Discussions</span>
              </div>
              <ul className="space-y-2">
                <li className="text-xs">
                  <a href="#" className="text-emerald-600 hover:underline">
                    Slack: Auth Service Performance Issues
                  </a>
                  <p className="text-gray-500 mt-0.5">2 days ago</p>
                </li>
                <li className="text-xs">
                  <a href="#" className="text-emerald-600 hover:underline">
                    GitHub: PR #42 - Auth Refactoring
                  </a>
                  <p className="text-gray-500 mt-0.5">3 days ago</p>
                </li>
                <li className="text-xs">
                  <a href="#" className="text-emerald-600 hover:underline">
                    Jira: AUTH-245 - Token Refresh Mechanism
                  </a>
                  <p className="text-gray-500 mt-0.5">In Progress</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
