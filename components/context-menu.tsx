"use client"

import { useEffect, useRef } from "react"
import { FolderPlus, FilePlus, Pencil, Trash, Share2, Copy } from "lucide-react"

type ContextMenuProps = {
  x: number
  y: number
  onClose: () => void
  type: "space" | "folder" | "document"
  itemName: string
  onAddDocument: (parentSpace: string, parentFolder?: string) => void
  onAddFolder: (parentSpace: string, parentFolder?: string) => void
  onDelete: (
    type: "space" | "folder" | "document",
    itemName: string,
    parentSpace: string,
    parentFolder?: string,
  ) => void
  parentSpace: string
  parentFolder?: string
}

// Define the Space type
interface Space {
  id: string
  name: string
  // Add other properties of a Space here
}

export default function ContextMenu({
  x,
  y,
  onClose,
  type,
  itemName,
  onAddDocument,
  onAddFolder,
  onDelete,
  parentSpace,
  parentFolder,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleAction = (action: string) => {
    switch (action) {
      case "add-document":
        console.log(`Context menu: Add document to space: "${parentSpace}", folder: "${parentFolder || "none"}"`)
        onAddDocument(parentSpace, parentFolder)
        break
      case "add-folder":
        console.log(`Context menu: Add folder to space: "${parentSpace}", folder: "${parentFolder || "none"}"`)
        onAddFolder(parentSpace, parentFolder)
        break
      case "delete":
        console.log(
          `Context menu: Delete ${type} "${itemName}" from space: "${parentSpace}", folder: "${parentFolder || "none"}"`,
        )
        onDelete(type, itemName, parentSpace, parentFolder)
        break
      default:
        console.log(`Action: ${action} on ${type} "${itemName}"`)
    }
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className="absolute bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 w-56"
      style={{ top: y, left: x }}
    >
      {type === "space" || type === "folder" ? (
        <>
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => handleAction("add-document")}
          >
            <FilePlus className="mr-2 h-4 w-4 text-gray-500" />
            Add Document
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={() => handleAction("add-folder")}
          >
            <FolderPlus className="mr-2 h-4 w-4 text-gray-500" />
            Add Folder
          </button>
        </>
      ) : null}

      <button
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        onClick={() => handleAction("rename")}
      >
        <Pencil className="mr-2 h-4 w-4 text-gray-500" />
        Rename
      </button>

      <button
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        onClick={() => handleAction("share")}
      >
        <Share2 className="mr-2 h-4 w-4 text-gray-500" />
        Share
      </button>

      <button
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        onClick={() => handleAction("duplicate")}
      >
        <Copy className="mr-2 h-4 w-4 text-gray-500" />
        Duplicate
      </button>

      <div className="border-t border-gray-200 my-1"></div>

      <button
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
        onClick={() => handleAction("delete")}
      >
        <Trash className="mr-2 h-4 w-4 text-red-500" />
        Delete
      </button>
    </div>
  )
}
