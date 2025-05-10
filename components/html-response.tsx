"use client"

import { useEffect, useRef } from "react"

interface HtmlResponseProps {
  content: string
  className?: string
}

export default function HtmlResponse({ content, className = "" }: HtmlResponseProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // This effect can be used to initialize any interactive elements in the HTML content
  useEffect(() => {
    // For example, if we need to add syntax highlighting or other interactive features
    // to the rendered HTML content, we can do it here
  }, [content])

  // If content is empty, don't render anything
  if (!content) return null

  // If content doesn't have HTML tags, wrap it in paragraph tags
  const htmlContent = content.includes("<") ? content : `<p>${content}</p>`

  return (
    <div
      ref={containerRef}
      className={`html-response ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
