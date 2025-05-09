"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  LinkIcon,
  Table,
  AlignLeft,
  ChevronDown,
  Sparkles,
  Save,
  MoreHorizontal,
  Users,
  Eye,
  ImageIcon,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import SpacesSidebar from "@/components/spaces-sidebar"

export default function EditorPage() {
  const [content, setContent] = useState(`
# Project Documentation

## Overview

This document outlines the key components and architecture of our new product feature. The goal is to provide a comprehensive guide for all team members.

## Requirements

- User authentication
- Data synchronization
- Real-time collaboration
- Version history

## Implementation Details

The implementation will follow our standard development practices and utilize our existing technology stack.
  `)

  const [activeUsers] = useState([
    { id: 1, name: "Sarah Johnson", color: "bg-pink-500", initials: "SJ" },
    { id: 2, name: "Michael Chen", color: "bg-blue-500", initials: "MC" },
    { id: 3, name: "You", color: "bg-purple-500", initials: "YO" },
  ])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Spaces */}
      <SpacesSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">DocuMind</h1>
              <nav className="hidden md:flex items-center space-x-1">
                <Button variant="ghost" className="text-sm">
                  Spaces
                </Button>
                <Button variant="ghost" className="text-sm">
                  People
                </Button>
                <Button variant="ghost" className="text-sm">
                  Templates
                </Button>
                <Button variant="ghost" className="text-sm">
                  Create <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </nav>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="flex items-center">
                <Eye className="mr-1.5 h-4 w-4" />
                Preview
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-1.5 h-4 w-4" />
                Save
              </Button>
              <div className="flex -space-x-2">
                {activeUsers.map((user) => (
                  <Avatar key={user.id} className="h-7 w-7 border-2 border-white">
                    <AvatarFallback className={`${user.color} text-white text-xs`}>{user.initials}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="ghost" size="icon">
                <Users className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Editor Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-1.5">
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
              <ImageIcon className="h-4 w-4" />
            </Button>
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
              variant="outline"
              size="sm"
              className="h-8 bg-white text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              <Sparkles className="mr-1.5 h-4 w-4" />
              AI Assist
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full min-h-[500px] focus:outline-none resize-none font-mono text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Comments */}
      <div className="w-64 border-l border-gray-200 bg-white hidden lg:block">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-800">Comments</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">MC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-800">Michael Chen</span>
                    <span className="text-xs text-gray-500 ml-2">2h ago</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">Can we add more details to the implementation section?</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-pink-500 text-white text-xs">SJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-gray-800">Sarah Johnson</span>
                    <span className="text-xs text-gray-500 ml-2">1h ago</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">
                    I've added a new requirement for analytics tracking. Please review.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <textarea
              placeholder="Add a comment..."
              className="w-full text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            ></textarea>
            <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">Comment</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
