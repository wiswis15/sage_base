"use client"

import { useEffect, useRef } from "react"

interface HtmlResponseProps {
  content: string
  className?: string
}

export default function HtmlResponse({ content, className = "" }: HtmlResponseProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Apply any necessary initialization for interactive elements
    if (containerRef.current) {
      // You could initialize any interactive elements here if needed
      // For example, syntax highlighting, tooltips, etc.
    }
  }, [content])

  return (
    <div ref={containerRef} className={`html-response ${className}`} dangerouslySetInnerHTML={{ __html: content }} />
  )
}
