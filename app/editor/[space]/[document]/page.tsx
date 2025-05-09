"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Save, ArrowLeft, Share2, MoreHorizontal, Clock, User, ChevronRight } from "lucide-react"
import Link from "next/link"
import SideNavigation from "@/components/side-navigation"
import RichTextEditor from "@/components/rich-text-editor"
import AIAssistButton from "@/components/ai-assist-button"

export default function DocumentEditorPage() {
  const params = useParams()
  const spaceId = params.space as string
  const documentId = params.document as string

  const [documentTitle, setDocumentTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    // In a real app, we would fetch the document data
    // For now, we'll just set a title based on the document ID
    setDocumentTitle(
      documentId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    )

    // Set some sample content
    setContent(`
  <div style="text-align: center;">
    <h1 style="font-size: 28px; color: #10b981; margin-bottom: 10px;">Rich text editor, empowered by AI</h1>
  </div>
`)
  }, [documentId])

  const handleSave = () => {
    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      setLastSaved(new Date())
    }, 1000)
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
              <AIAssistButton onInsertContent={(content) => setContent((prev) => prev + content)} />
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="mr-1.5 h-4 w-4" />
                Share
              </Button>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="mr-1.5 h-4 w-4" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Document Info */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <Link href="/" className="hover:text-emerald-600">
                  SageBase
                </Link>
                <ChevronRight className="h-3 w-3 mx-1" />
                <Link href={`/spaces/${spaceId}`} className="capitalize hover:text-emerald-600">
                  {spaceId}
                </Link>
                <ChevronRight className="h-3 w-3 mx-1" />
                <span className="text-gray-700">{documentTitle}</span>
              </div>
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                className="text-xl font-bold text-gray-800 border-0 focus:ring-0 focus:outline-none p-0 w-full"
              />
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs">DRAFT</span>
                <span className="mx-1.5">•</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : "Not saved yet"}</span>
                <span className="mx-1.5">•</span>
                <User className="h-3 w-3 mr-1" />
                <span>You</span>
              </div>
            </div>
            <AIAssistButton />
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto py-8 px-4">
            <RichTextEditor initialValue={content} onChange={setContent} />
          </div>
        </div>
      </div>
    </div>
  )
}
