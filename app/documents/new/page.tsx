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
  MessageSquare,
} from "lucide-react"
import SideNavigation from "@/components/side-navigation"

export default function NewDocumentPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [space, setSpace] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [showAICoWriter, setShowAICoWriter] = useState(true)
  const [aiCoWriterSuggestions, setAiCoWriterSuggestions] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)

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

  const simulateAICoWriter = (text: string) => {
    // Only show suggestions if there's content and the feature is enabled
    if (text.length > 10 && showAICoWriter) {
      setIsTyping(true)

      // Simulate AI thinking
      setTimeout(() => {
        setIsTyping(false)

        // Generate contextual suggestions based on content
        if (text.toLowerCase().includes("authentication") || text.toLowerCase().includes("auth")) {
          setAiCoWriterSuggestions([
            "Add a section explaining authentication methods",
            "Describe the authentication flow with a sequence diagram",
            "Include code example for user authentication",
          ])
        } else if (text.toLowerCase().includes("api") || text.toLowerCase().includes("endpoint")) {
          setAiCoWriterSuggestions([
            "List all available API endpoints in a table",
            "Add request/response examples for each endpoint",
            "Include error handling guidelines",
          ])
        } else {
          setAiCoWriterSuggestions([
            "Expand on this section with more details",
            "Add a diagram to visualize this concept",
            "Include a code example to demonstrate implementation",
          ])
        }
      }, 1000)
    } else {
      setAiCoWriterSuggestions([])
    }
  }

  const getAIGeneratedContent = (suggestion: string) => {
    // In a real app, this would call an AI service
    // For demo, return static content based on suggestion type
    if (suggestion.includes("authentication methods")) {
      return `Common Authentication Methods:
1. API Keys - Simple string tokens included in request headers
2. OAuth 2.0 - Industry-standard protocol for authorization
3. Session-based Authentication - Uses cookies to maintain state
4. Basic Authentication - Username/password encoded in headers
5. Multi-factor Authentication - Combines multiple verification methods

Each method has different security implications and use cases.`
    } else if (suggestion.includes("diagram")) {
      return `Sequence Diagram:
1. Client sends credentials to /auth endpoint
2. Server validates credentials
3. Server generates JWT token
4. Token is returned to client
5. Client stores token
6. Client includes token in Authorization header for subsequent requests
7. Server validates token for each request`
    } else if (suggestion.includes("code example")) {
      return `\`\`\`typescript
// Basic authentication middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  // Decode the Base64 encoded credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  
  // Validate credentials (in a real app, check against database)
  if (validateCredentials(username, password)) {
    req.user = { username };
    next();
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}

function validateCredentials(username, password) {
  // In a real app, validate against database
  return username === 'admin' && password === 'password';
}
\`\`\``
    } else {
      return `This section needs more detailed explanation. Consider adding:
- Background information
- Step-by-step instructions
- Examples of usage
- Common pitfalls and how to avoid them
- References to related documentation`
    }
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

              {/* AI Co-Writer Feature Banner */}
              <div className="bg-blue-50 border border-blue-100 rounded-t-lg p-3 flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-1.5 mt-0.5">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-700">AI Co-Writer Enabled</h3>
                  <p className="text-xs text-blue-600 mt-0.5">
                    The AI suggests content, autocompletes steps, and helps explain things more clearly—based on your
                    project's real context. It's like having a smart co-writer built into your editor.
                  </p>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() => setShowAICoWriter(!showAICoWriter)}
                      className="text-xs bg-white border border-blue-200 text-blue-600 px-2 py-1 rounded hover:bg-blue-50"
                    >
                      {showAICoWriter ? "Disable" : "Enable"} AI Co-Writer
                    </button>
                  </div>
                </div>
              </div>

              {/* Editor Content */}
              <Textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value)
                  simulateAICoWriter(e.target.value)
                }}
                className="min-h-[400px] border-t-0 rounded-t-none focus-visible:ring-0 focus-visible:border-emerald-500"
                placeholder="Start writing or use AI to generate content..."
              />

              {/* AI Co-Writer Typing Indicator */}
              {isTyping && showAICoWriter && (
                <div className="mt-2 p-2 border border-blue-100 rounded-lg bg-blue-50">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-blue-700 text-sm font-medium">AI is analyzing your document...</span>
                  </div>
                  <div className="mt-1 flex space-x-2">
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              )}

              {/* AI Co-Writer Suggestions */}
              {aiCoWriterSuggestions.length > 0 && showAICoWriter && (
                <div className="mt-2 p-3 border border-blue-100 rounded-lg bg-blue-50">
                  <div className="flex items-center mb-2">
                    <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-blue-700 text-sm font-medium">AI Co-Writer Suggestions</span>
                  </div>
                  <div className="space-y-2">
                    {aiCoWriterSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-2 rounded border border-blue-100"
                      >
                        <span className="text-gray-700 text-sm">{suggestion}</span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => {
                              setContent((prev) => `${prev}\n\n${suggestion}:\n`)
                              setAiCoWriterSuggestions([])
                            }}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            Insert
                          </button>
                          <button
                            onClick={() => {
                              // Generate full content for this suggestion
                              setContent((prev) => `${prev}\n\n${suggestion}:\n${getAIGeneratedContent(suggestion)}`)
                              setAiCoWriterSuggestions([])
                            }}
                            className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Write for me
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
