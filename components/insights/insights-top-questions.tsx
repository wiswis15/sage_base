"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function InsightsTopQuestions() {
  const [topQuestions] = useState([
    {
      id: 1,
      question: "How to configure OAuth in Atlas API?",
      count: 47,
      projects: ["Atlas"],
      hasAnswer: true,
      lastAsked: "2 hours ago",
    },
    {
      id: 2,
      question: "What's the recommended way to handle error responses in the Nova frontend?",
      count: 32,
      projects: ["Nova"],
      hasAnswer: true,
      lastAsked: "5 hours ago",
    },
    {
      id: 3,
      question: "How to set up the CI/CD pipeline for Pulse?",
      count: 28,
      projects: ["Pulse"],
      hasAnswer: true,
      lastAsked: "1 day ago",
    },
    {
      id: 4,
      question: "What's the authentication flow between Atlas and Nova?",
      count: 24,
      projects: ["Atlas", "Nova"],
      hasAnswer: true,
      lastAsked: "3 hours ago",
    },
    {
      id: 5,
      question: "How to implement rate limiting in the Atlas API?",
      count: 21,
      projects: ["Atlas"],
      hasAnswer: false,
      lastAsked: "6 hours ago",
    },
    {
      id: 6,
      question: "What's the database schema for user profiles in Sentinel?",
      count: 19,
      projects: ["Sentinel"],
      hasAnswer: true,
      lastAsked: "1 day ago",
    },
    {
      id: 7,
      question: "How to debug the WebSocket connection in Pulse?",
      count: 17,
      projects: ["Pulse"],
      hasAnswer: false,
      lastAsked: "4 hours ago",
    },
  ])

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Question</th>
            <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Count</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Projects</th>
            <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">Last Asked</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500 text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          {topQuestions.map((question) => (
            <tr key={question.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <span className="text-gray-800">{question.question}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-center">
                <span className="font-medium text-gray-800">{question.count}</span>
              </td>
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
              <td className="py-3 px-4 text-center">
                {question.hasAnswer ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                    Answered
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                    Needs Answer
                  </span>
                )}
              </td>
              <td className="py-3 px-4 text-gray-500 text-sm">{question.lastAsked}</td>
              <td className="py-3 px-4 text-right">
                <Link href={`/questions/${question.id}`}>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="sr-only">View Question</span>
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <Button variant="outline" size="sm" className="text-sm">
          View All Top Questions <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
