"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Home,
  FileText,
  Users,
  Settings,
  PlusCircle,
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  X,
  Database,
  MessageSquare,
  Code,
  Mail,
} from "lucide-react"
import Link from "next/link"
import ContextMenu from "./context-menu"
import AddDocumentModal from "./add-document-modal"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

type SpaceItem = {
  id: string
  name: string
  type: "folder" | "document"
  children?: SpaceItem[]
}

type Space = {
  id: string
  name: string
  color: string
  initial: string
  items: SpaceItem[]
}

export default function SideNavigation() {
  const router = useRouter()
  const [contextMenu, setContextMenu] = useState<{
    show: boolean
    x: number
    y: number
    type: "space" | "folder" | "document"
    itemName: string
    parentSpace: string
    parentFolder?: string
  }>({
    show: false,
    x: 0,
    y: 0,
    type: "space",
    itemName: "",
    parentSpace: "",
  })

  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false)
  const [modalData, setModalData] = useState({
    parentSpace: "",
    parentFolder: "",
  })

  const [expandedSpaces, setExpandedSpaces] = useState<string[]>(["Atlas", "Nova"])
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["Atlas-Architecture", "Nova-Components"])

  // Add a state update counter to force re-renders
  const [updateCounter, setUpdateCounter] = useState(0)

  const [spaces, setSpaces] = useState<Space[]>([
    {
      id: "atlas",
      name: "Atlas",
      color: "bg-blue-100",
      initial: "A",
      items: [
        {
          id: "architecture",
          name: "Architecture",
          type: "folder",
          children: [
            {
              id: "system-overview",
              name: "System Overview",
              type: "document",
            },
            {
              id: "data-flow",
              name: "Data Flow",
              type: "document",
            },
          ],
        },
        {
          id: "api",
          name: "API",
          type: "folder",
          children: [
            {
              id: "authentication",
              name: "Authentication",
              type: "document",
            },
            {
              id: "endpoints",
              name: "Endpoints",
              type: "document",
            },
          ],
        },
      ],
    },
    {
      id: "nova",
      name: "Nova",
      color: "bg-green-100",
      initial: "N",
      items: [
        {
          id: "components",
          name: "Components",
          type: "folder",
          children: [
            {
              id: "ui-library",
              name: "UI Library",
              type: "document",
            },
          ],
        },
        {
          id: "roadmap",
          name: "Roadmap",
          type: "document",
        },
      ],
    },
  ])

  // Add effect to log spaces state changes
  useEffect(() => {
    console.log("Spaces state updated:", spaces)
    // Log the total number of items in each space
    spaces.forEach((space) => {
      console.log(`Space ${space.name} has ${space.items.length} items`)
    })
  }, [spaces, updateCounter])

  // Add this useEffect after the existing useEffect for logging
  useEffect(() => {
    // This effect will run whenever spaces or expandedSpaces or expandedFolders change
    // It forces a re-render by updating the counter
    setUpdateCounter((prev) => prev + 1)
  }, [spaces, expandedSpaces, expandedFolders])

  const handleContextMenu = (
    e: React.MouseEvent,
    type: "space" | "folder" | "document",
    itemName: string,
    parentSpace: string,
    parentFolder?: string,
  ) => {
    e.preventDefault()
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      type,
      itemName,
      parentSpace,
      parentFolder,
    })
  }

  const closeContextMenu = () => {
    setContextMenu({ ...contextMenu, show: false })
  }

  const toggleSpace = (space: string) => {
    if (expandedSpaces.includes(space)) {
      setExpandedSpaces(expandedSpaces.filter((s) => s !== space))
    } else {
      setExpandedSpaces([...expandedSpaces, space])
    }
  }

  const toggleFolder = (folderId: string) => {
    if (expandedFolders.includes(folderId)) {
      setExpandedFolders(expandedFolders.filter((f) => f !== folderId))
    } else {
      setExpandedFolders([...expandedFolders, folderId])
    }
  }

  const [showAddSpaceModal, setShowAddSpaceModal] = useState(false)
  const [newSpaceName, setNewSpaceName] = useState("")
  const [newSpaceColor, setNewSpaceColor] = useState("bg-blue-100")
  const [showPlatformsModal, setShowPlatformsModal] = useState(false)

  const handleAddSpace = () => {
    setShowAddSpaceModal(true)
  }

  const createNewSpace = () => {
    if (!newSpaceName.trim()) return

    const newSpaceId = newSpaceName.toLowerCase().replace(/\s+/g, "-")
    const initial = newSpaceName.charAt(0).toUpperCase()

    const newSpace: Space = {
      id: newSpaceId,
      name: newSpaceName,
      color: newSpaceColor,
      initial: initial,
      items: [],
    }

    setSpaces([...spaces, newSpace])
    setExpandedSpaces([...expandedSpaces, newSpaceName])
    setNewSpaceName("")
    setShowAddSpaceModal(false)
  }

  const handleAddDocument = (parentSpace: string, parentFolder?: string) => {
    console.log(`Opening modal to add document to space: "${parentSpace}", folder: "${parentFolder || "none"}"`)

    // Set the modal data with the correct parameters
    setModalData({
      parentSpace,
      parentFolder: parentFolder || "",
    })

    // Show the modal
    setShowAddDocumentModal(true)
  }

  const handleAddFolder = (parentSpace: string, parentFolder?: string) => {
    // In a real app, this would open a modal to create a new folder
    console.log("Add new folder to", parentSpace, parentFolder)
  }

  const createDocument = (title: string, parentSpace: string, parentFolder?: string) => {
    console.log(`Creating document: "${title}" in space: "${parentSpace}", folder: "${parentFolder || "none"}"`)

    // Create a deep copy of the spaces array to avoid mutation issues
    const newSpaces = JSON.parse(JSON.stringify(spaces))

    // Find the space by name (case-insensitive to be safe)
    const spaceIndex = newSpaces.findIndex((s) => s.name.toLowerCase() === parentSpace.toLowerCase())

    if (spaceIndex === -1) {
      console.error(`Space "${parentSpace}" not found`)
      return
    }

    console.log(`Found space at index ${spaceIndex}: ${newSpaces[spaceIndex].name}`)
    console.log(`Space has ${newSpaces[spaceIndex].items.length} items before adding`)

    const newDocId = title.toLowerCase().replace(/\s+/g, "-")

    if (parentFolder) {
      // Find the folder (case-insensitive to be safe)
      const folderIndex = newSpaces[spaceIndex].items.findIndex(
        (item) => item.type === "folder" && item.name.toLowerCase() === parentFolder.toLowerCase(),
      )

      if (folderIndex === -1) {
        console.error(`Folder "${parentFolder}" not found in space "${parentSpace}"`)
        return
      }

      console.log(`Found folder at index ${folderIndex}: ${newSpaces[spaceIndex].items[folderIndex].name}`)

      // Initialize children array if it doesn't exist
      if (!newSpaces[spaceIndex].items[folderIndex].children) {
        newSpaces[spaceIndex].items[folderIndex].children = []
      }

      // Add document to folder
      const newDocument = {
        id: newDocId,
        name: title,
        type: "document" as const,
      }

      newSpaces[spaceIndex].items[folderIndex].children!.push(newDocument)
      console.log(`Added document to folder: ${JSON.stringify(newDocument)}`)
    } else {
      // Add document directly to space
      const newDocument = {
        id: newDocId,
        name: title,
        type: "document" as const,
      }

      newSpaces[spaceIndex].items.push(newDocument)
      console.log(`Added document directly to space: ${JSON.stringify(newDocument)}`)
    }

    console.log(`Space has ${newSpaces[spaceIndex].items.length} items after adding`)

    // Update the state with the new spaces array
    setSpaces(newSpaces)

    // Increment the update counter to force a re-render
    setUpdateCounter((prev) => prev + 1)

    // Ensure the space is expanded to show the new document
    if (!expandedSpaces.includes(parentSpace)) {
      console.log(`Expanding space: ${parentSpace}`)
      setExpandedSpaces([...expandedSpaces, parentSpace])
    }

    // If document is added to a folder, ensure the folder is expanded
    if (parentFolder) {
      const folderKey = `${parentSpace}-${parentFolder}`
      if (!expandedFolders.includes(folderKey)) {
        console.log(`Expanding folder: ${folderKey}`)
        setExpandedFolders([...expandedFolders, folderKey])
      }
    }

    // Navigate to the new document
    const spaceId = newSpaces[spaceIndex].id
    console.log(`Navigating to: /editor/${spaceId}/${newDocId}`)
    router.push(`/editor/${spaceId}/${newDocId}`)
  }

  const getTextColor = (bgColor: string) => {
    if (bgColor.includes("blue")) return "text-blue-600"
    if (bgColor.includes("green")) return "text-green-600"
    if (bgColor.includes("purple")) return "text-purple-600"
    if (bgColor.includes("amber")) return "text-amber-600"
    return "text-gray-600"
  }

  // Add a handleDelete function to the SideNavigation component
  const handleDelete = (
    type: "space" | "folder" | "document",
    itemName: string,
    parentSpace: string,
    parentFolder?: string,
  ) => {
    if (type === "space") {
      // Delete space
      setSpaces(spaces.filter((space) => space.name !== itemName))
    } else if (type === "folder") {
      // Delete folder
      setSpaces(
        spaces.map((space) => {
          if (space.name === parentSpace) {
            return {
              ...space,
              items: space.items.filter((item) => item.name !== itemName),
            }
          }
          return space
        }),
      )
    } else if (type === "document") {
      // Delete document
      setSpaces(
        spaces.map((space) => {
          if (space.name === parentSpace) {
            if (parentFolder) {
              // Document is inside a folder
              return {
                ...space,
                items: space.items.map((item) => {
                  if (item.name === parentFolder && item.children) {
                    return {
                      ...item,
                      children: item.children.filter((child) => child.name !== itemName),
                    }
                  }
                  return item
                }),
              }
            } else {
              // Document is directly in space
              return {
                ...space,
                items: space.items.filter((item) => item.name !== itemName),
              }
            }
          }
          return space
        }),
      )
    }

    // Increment the update counter to force a re-render
    setUpdateCounter((prev) => prev + 1)
  }

  return (
    <div className="w-56 bg-gray-100 border-r border-gray-200 flex flex-col h-full">
      <div className="p-3">
        <Button variant="outline" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </div>

      <div className="px-3 py-2">
        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-2">
          <span>CONNECTED PLATFORMS</span>
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setShowPlatformsModal(true)}>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <ul className="space-y-1">
          <li>
            <div className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md">
              <Database className="mr-2 h-4 w-4 text-emerald-500" />
              Confluence
            </div>
          </li>
          <li>
            <div className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md">
              <FileText className="mr-2 h-4 w-4 text-blue-500" />
              Jira
            </div>
          </li>
          <li>
            <div className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md">
              <MessageSquare className="mr-2 h-4 w-4 text-purple-500" />
              Slack
            </div>
          </li>
          <li>
            <div className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md">
              <MessageSquare className="mr-2 h-4 w-4 text-blue-600" />
              Teams
            </div>
          </li>
          <li>
            <div className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md">
              <Code className="mr-2 h-4 w-4 text-gray-700" />
              GitHub
            </div>
          </li>
          <li>
            <div className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md">
              <Mail className="mr-2 h-4 w-4 text-red-500" />
              Email
            </div>
          </li>
        </ul>
      </div>

      <div className="px-3 py-2 flex-1 overflow-auto">
        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-2">
          <span>KNOWLEDGE SPACES</span>
          <Button variant="ghost" size="icon" className="h-5 w-5" onClick={handleAddSpace}>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>

        <ul className="space-y-1">
          {spaces.map((space) => (
            <li key={`${space.id}-${updateCounter}`}>
              <div
                className="flex items-center justify-between text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-100 hover:bg-opacity-70 cursor-pointer"
                onClick={() => toggleSpace(space.name)}
                onContextMenu={(e) => handleContextMenu(e, "space", space.name, space.name)}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 ${space.color} rounded flex items-center justify-center mr-2`}>
                    <span className={`${getTextColor(space.color)} text-xs font-medium`}>{space.initial}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{space.name}</span>
                </div>
                {expandedSpaces.includes(space.name) ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </div>

              {expandedSpaces.includes(space.name) &&
                (console.log(`Rendering items for space ${space.name}:`, space.items),
                (
                  <ul className="ml-7 mt-1 space-y-1">
                    {space.items.map((item) => (
                      <li key={`${space.id}-${item.id}-${updateCounter}`}>
                        {item.type === "folder" ? (
                          <>
                            <div
                              className="flex items-center justify-between text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200 cursor-pointer"
                              onClick={() => toggleFolder(`${space.name}-${item.name}`)}
                              onContextMenu={(e) => handleContextMenu(e, "folder", item.name, space.name, item.name)}
                            >
                              <div className="flex items-center">
                                <Folder className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                                <span>{item.name}</span>
                              </div>
                              {expandedFolders.includes(`${space.name}-${item.name}`) ? (
                                <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
                              )}
                            </div>

                            {expandedFolders.includes(`${space.name}-${item.name}`) &&
                              item.children &&
                              item.children.length > 0 && (
                                <ul className="ml-5 mt-1 space-y-1">
                                  {item.children.map((child) => (
                                    <li key={`${space.id}-${item.id}-${child.id}-${updateCounter}`}>
                                      <Link
                                        href={`/editor/${space.id}/${child.id}`}
                                        className="flex items-center text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200"
                                        onContextMenu={(e) => {
                                          e.preventDefault()
                                          handleContextMenu(e, "document", child.name, space.name, item.name)
                                        }}
                                      >
                                        <File className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                                        <span>{child.name}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </>
                        ) : (
                          <Link
                            href={`/editor/${space.id}/${item.id}`}
                            className="flex items-center text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200"
                            onContextMenu={(e) => {
                              e.preventDefault()
                              handleContextMenu(e, "document", item.name, space.name)
                            }}
                          >
                            <File className="h-3.5 w-3.5 text-gray-500 mr-1.5" />
                            <span>{item.name}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ))}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto border-t border-gray-200 p-3">
        <ul className="space-y-1">
          <li>
            <Link
              href="/teams"
              className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200"
            >
              <Users className="mr-2 h-4 w-4 text-gray-500" />
              Teams
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200"
            >
              <Settings className="mr-2 h-4 w-4 text-gray-500" />
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          type={contextMenu.type}
          itemName={contextMenu.itemName}
          onAddDocument={handleAddDocument}
          onAddFolder={handleAddFolder}
          onDelete={handleDelete}
          parentSpace={contextMenu.parentSpace}
          parentFolder={contextMenu.parentFolder}
        />
      )}

      {showAddDocumentModal && (
        <AddDocumentModal
          onClose={() => setShowAddDocumentModal(false)}
          onAdd={createDocument}
          parentSpace={modalData.parentSpace}
          parentFolder={modalData.parentFolder || undefined}
        />
      )}

      {showAddSpaceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Add New Space</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowAddSpaceModal(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                createNewSpace()
              }}
              className="p-4"
            >
              <div className="mb-4">
                <label htmlFor="space-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Space Name
                </label>
                <Input
                  id="space-name"
                  value={newSpaceName}
                  onChange={(e) => setNewSpaceName(e.target.value)}
                  placeholder="Enter space name"
                  className="w-full"
                  autoFocus
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Space Color</label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setNewSpaceColor("bg-blue-100")}
                    className={`w-8 h-8 rounded-full bg-blue-100 ${newSpaceColor === "bg-blue-100" ? "ring-2 ring-blue-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setNewSpaceColor("bg-green-100")}
                    className={`w-8 h-8 rounded-full bg-green-100 ${newSpaceColor === "bg-green-100" ? "ring-2 ring-green-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setNewSpaceColor("bg-purple-100")}
                    className={`w-8 h-8 rounded-full bg-purple-100 ${newSpaceColor === "bg-purple-100" ? "ring-2 ring-purple-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setNewSpaceColor("bg-amber-100")}
                    className={`w-8 h-8 rounded-full bg-amber-100 ${newSpaceColor === "bg-amber-100" ? "ring-2 ring-amber-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setNewSpaceColor("bg-red-100")}
                    className={`w-8 h-8 rounded-full bg-red-100 ${newSpaceColor === "bg-red-100" ? "ring-2 ring-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setNewSpaceColor("bg-gray-100")}
                    className={`w-8 h-8 rounded-full bg-gray-100 ${newSpaceColor === "bg-gray-100" ? "ring-2 ring-gray-500" : ""}`}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => setShowAddSpaceModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!newSpaceName.trim()}>
                  Create Space
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showPlatformsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Add Platform Connection</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowPlatformsModal(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="border rounded-md">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-medium">Documentation Platforms</h3>
                  </div>
                  <div className="divide-y">
                    <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="font-medium">Notion</span>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <Database className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="font-medium">Nuclino</span>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-medium">Communication Platforms</h3>
                  </div>
                  <div className="divide-y">
                    <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span className="font-medium">Discord</span>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-orange-500 mr-2" />
                        <span className="font-medium">Google Chat</span>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-medium">Code Platforms</h3>
                  </div>
                  <div className="divide-y">
                    <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="font-medium">GitLab</span>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                    <div className="p-3 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 text-purple-500 mr-2" />
                        <span className="font-medium">Bitbucket</span>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end p-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setShowPlatformsModal(false)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
