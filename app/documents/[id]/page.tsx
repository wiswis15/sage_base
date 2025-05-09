"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Database, FileText, MessageSquare, Code, Mail, Clock, User } from "lucide-react"
import Link from "next/link"
import SideNavigation from "@/components/side-navigation"

export default function DocumentPage() {
  const params = useParams()
  const documentId = params.id

  // In a real app, we would fetch the document data based on the ID
  // For now, we'll just simulate different document types based on the ID
  const getDocumentData = () => {
    const sources = ["confluence", "jira", "slack", "github", "email"]
    const sourceIndex = Number(documentId) % sources.length
    const source = sources[sourceIndex]

    const titles = [
      "API Authentication Documentation",
      "Auth Service Refactoring",
      "Fix OAuth token refresh logic",
      "AUTH-245: Implement token refresh mechanism",
      "Re: OAuth Implementation Timeline",
    ]

    const authors = ["Michael Chen", "Sarah Johnson", "Alex Rodriguez", "You", "Jamie Smith"]

    return {
      id: documentId,
      title: titles[Number(documentId) % titles.length],
      source,
      author: authors[Number(documentId) % authors.length],
      date: "2 days ago",
    }
  }

  const document = getDocumentData()

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "confluence":
        return <Database className="h-5 w-5 text-emerald-500" />
      case "jira":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "slack":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case "github":
        return <Code className="h-5 w-5 text-gray-700" />
      case "email":
        return <Mail className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getSourceLabel = (source: string) => {
    return source.charAt(0).toUpperCase() + source.slice(1)
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
              <Link href="/">
                <Button variant="outline" size="sm" className="flex items-center">
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Document Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Document Header */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                {getSourceIcon(document.source)}
                <span className="ml-2 text-sm font-medium text-gray-600">{getSourceLabel(document.source)}</span>
                <span className="mx-2 text-gray-300">•</span>
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="ml-1 text-sm text-gray-500">{document.date}</span>
                <span className="mx-2 text-gray-300">•</span>
                <User className="h-4 w-4 text-gray-400" />
                <span className="ml-1 text-sm text-gray-500">{document.author}</span>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-2">{document.title}</h1>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Documentation
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  API
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Authentication
                </span>
              </div>
            </div>

            {/* Simulation Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6 text-center">
              <h2 className="text-xl font-bold text-amber-700 mb-2">Simulation Mode</h2>
              <p className="text-amber-600">
                This is a simulated document page. In a real application, this would display the actual content of
                document ID: {documentId}.
              </p>
            </div>

            {/* Fake Document Content */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="space-y-4">
                <div className="h-6 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded w-4/5 animate-pulse"></div>

                <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse mt-8"></div>
                <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded w-4/5 animate-pulse"></div>

                <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse mt-8"></div>
                <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
