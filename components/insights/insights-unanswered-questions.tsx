"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default function InsightsUnansweredQuestions() {
  const [unansweredQuestions] = useState([
    {
      id: 1,
      question: "How to implement rate limiting in the Atlas API?",
      askedBy: "Michael Chen",
      projects: ["Atlas"],
      timeAgo: "6 hours ago",
      views: 12,
    },
    {
      id: 2,
      question: "How to debug the WebSocket connection in Pulse?",
      askedBy: "Sarah Johnson",
      projects: ["Pulse"],
      timeAgo: "4 hours ago",
      views: 8,
    },
    {
      id: 3,
      question: "What's the best way to handle file uploads in Nova?",
      askedBy: "Alex Rodriguez",
      projects: ["Nova"],
      timeAgo: "10 hours ago",
      views: 5,
    },
    {
      id: 4,
      question: "How to implement pagination in the Sentinel admin dashboard?",
      askedBy: "Jamie Smith",
      projects: ["Sentinel"],
      timeAgo: "12 hours ago",
      views: 7,
    },
    {
      id: 5,
      question: "What's the process for adding a new API endpoint to Atlas?",
      askedBy: "Taylor Wilson",
      projects: ["Atlas"],
      timeAgo: "8 hours ago",
      views: 9,
    },
  ])

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Question</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Asked By</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Projects</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Time</th>
            <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Views</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {unansweredQuestions.map((question) => (
            <tr key={question.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <span className="text-gray-800">{question.question}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600">{question.askedBy}</td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {question.projects.map((project) => (
                    <span
                      key={project}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4 text-gray-500 text-sm">{question.timeAgo}</td>
              <td className="py-3 px-4 text-center text-gray-500 text-sm">{question.views}</td>
              <td className="py-3 px-4 text-right">
                <Link href={`/questions/${question.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                  >
                    Answer
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <Button variant="outline" size="sm" className="text-sm">
          View All Unanswered Questions <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
