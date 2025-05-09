"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronDown,
  Code,
  Quote,
  Minus,
  CheckSquare,
  Type,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type RichTextEditorProps = {
  initialValue: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({ initialValue, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue || ""
    }
  }, [initialValue])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    handleInput()
    editorRef.current?.focus()
  }

  const formatBlock = (block: string) => {
    execCommand("formatBlock", block)
  }

  const insertTable = () => {
    const table = `
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Header 1</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Header 2</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Header 3</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Row 1, Cell 1</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Row 1, Cell 2</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Row 1, Cell 3</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Row 2, Cell 1</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Row 2, Cell 2</td>
          <td style="border: 1px solid #ddd; padding: 8px;">Row 2, Cell 3</td>
        </tr>
      </table>
    `
    execCommand("insertHTML", table)
  }

  const insertImage = () => {
    const url = prompt("Enter image URL:")
    if (url) {
      execCommand("insertImage", url)
    }
  }

  const createLink = () => {
    const url = prompt("Enter link URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const insertHorizontalRule = () => {
    execCommand("insertHorizontalRule")
  }

  // Simulated AI writing suggestions
  useEffect(() => {
    if (!editorRef.current) return

    const handleKeyUp = (e: KeyboardEvent) => {
      // Show AI suggestion after typing a period followed by a space
      if (e.key === " " && editorRef.current?.innerHTML.trim().endsWith(".")) {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return

        // Only show suggestions occasionally to avoid being annoying
        if (Math.random() > 0.3) return

        // Get a random suggestion
        const suggestions = [
          "Consider adding more details about the implementation here.",
          "You might want to explain the benefits of this approach.",
          "Adding an example would help clarify this point.",
          "This could be expanded with relevant research or data.",
          "A diagram might help illustrate this concept better.",
        ]

        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]

        // Create and show the suggestion tooltip
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()

        const tooltip = document.createElement("div")
        tooltip.className =
          "fixed bg-purple-100 text-purple-800 text-xs p-2 rounded border border-purple-200 shadow-sm z-50 max-w-xs"
        tooltip.style.left = `${rect.left}px`
        tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`

        const suggestionText = document.createElement("p")
        suggestionText.textContent = `AI Suggestion: ${randomSuggestion}`
        tooltip.appendChild(suggestionText)

        const buttonContainer = document.createElement("div")
        buttonContainer.className = "flex justify-end mt-1"

        const acceptButton = document.createElement("button")
        acceptButton.textContent = "Accept"
        acceptButton.className = "bg-purple-600 text-white text-xs px-2 py-1 rounded mr-1 hover:bg-purple-700"
        acceptButton.onclick = () => {
          document.body.removeChild(tooltip)
          execCommand("insertHTML", ` <span class="text-purple-600">${randomSuggestion}</span> `)
        }

        const dismissButton = document.createElement("button")
        dismissButton.textContent = "Dismiss"
        dismissButton.className = "bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded hover:bg-gray-300"
        dismissButton.onclick = () => {
          document.body.removeChild(tooltip)
        }

        buttonContainer.appendChild(acceptButton)
        buttonContainer.appendChild(dismissButton)
        tooltip.appendChild(buttonContainer)

        document.body.appendChild(tooltip)

        // Remove the tooltip after 5 seconds if not interacted with
        setTimeout(() => {
          if (document.body.contains(tooltip)) {
            document.body.removeChild(tooltip)
          }
        }, 5000)
      }
    }

    editorRef.current.addEventListener("keyup", handleKeyUp)

    return () => {
      editorRef.current?.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      {/* Editor Toolbar */}
      <div className="bg-white border-b border-gray-200 px-2 py-1 flex flex-wrap items-center gap-0.5">
        {/* Paragraph Style Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-sm font-normal">
              <span>Paragraph</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={() => formatBlock("p")}>
              <Type className="mr-2 h-4 w-4" />
              <span>Paragraph</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatBlock("h1")}>
              <Heading1 className="mr-2 h-4 w-4" />
              <span>Heading 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatBlock("h2")}>
              <Heading2 className="mr-2 h-4 w-4" />
              <span>Heading 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatBlock("h3")}>
              <Heading3 className="mr-2 h-4 w-4" />
              <span>Heading 3</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatBlock("pre")}>
              <Code className="mr-2 h-4 w-4" />
              <span>Code Block</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatBlock("blockquote")}>
              <Quote className="mr-2 h-4 w-4" />
              <span>Quote</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        {/* Text Formatting */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand("italic")}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand("underline")}>
          <Underline className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        {/* Lists */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand("insertUnorderedList")}>
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand("insertOrderedList")}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => execCommand("insertHTML", "<div><input type='checkbox'> Task</div>")}
        >
          <CheckSquare className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        {/* Alignment */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand("justifyLeft")}>
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand("justifyCenter")}>
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand("justifyRight")}>
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand("justifyFull")}>
          <AlignJustify className="h-4 w-4" />
        </Button>

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        {/* Insert */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={createLink}>
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={insertImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={insertTable}>
          <Table className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={insertHorizontalRule}>
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => execCommand("insertHTML", "<code>Code</code>")}
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        className={`min-h-[300px] p-4 focus:outline-none ${isFocused ? "ring-2 ring-emerald-500 ring-inset" : ""}`}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: initialValue }}
      />
    </div>
  )
}
