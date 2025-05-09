"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

type AddDocumentModalProps = {
  onClose: () => void
  onAdd: (title: string, parentSpace: string, parentFolder?: string) => void
  parentSpace: string
  parentFolder?: string
}

export default function AddDocumentModal({ onClose, onAdd, parentSpace, parentFolder }: AddDocumentModalProps) {
  const [title, setTitle] = useState("")

  // Add this useEffect to log when the modal is opened with what parameters
  useEffect(() => {
    console.log(`Modal opened with parentSpace: "${parentSpace}", parentFolder: "${parentFolder || "none"}"`)
  }, [parentSpace, parentFolder])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      console.log(`Modal submitting: "${title}" in space: "${parentSpace}", folder: "${parentFolder || "none"}"`)
      // Call onAdd with the correct parameters
      onAdd(title, parentSpace, parentFolder)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Add New Document</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="document-title" className="block text-sm font-medium text-gray-700 mb-1">
              Document Title
            </label>
            <Input
              id="document-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              className="w-full"
              autoFocus
            />
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-500">
              Location: {parentSpace} {parentFolder ? `/ ${parentFolder}` : ""}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Create Document
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
