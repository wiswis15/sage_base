"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"

export default function InsightsProjectOverview() {
  const [projects] = useState([
    {
      name: "Atlas",
      color: "bg-blue-500",
      metrics: [
        { name: "Documentation Coverage", value: 85, color: "bg-emerald-500" },
        { name: "Question Answer Rate", value: 92, color: "bg-emerald-500" },
        { name: "Documentation Freshness", value: 78, color: "bg-amber-500" },
      ],
    },
    {
      name: "Nova",
      color: "bg-green-500",
      metrics: [
        { name: "Documentation Coverage", value: 72, color: "bg-amber-500" },
        { name: "Question Answer Rate", value: 88, color: "bg-emerald-500" },
        { name: "Documentation Freshness", value: 65, color: "bg-amber-500" },
      ],
    },
    {
      name: "Pulse",
      color: "bg-purple-500",
      metrics: [
        { name: "Documentation Coverage", value: 58, color: "bg-red-500" },
        { name: "Question Answer Rate", value: 75, color: "bg-amber-500" },
        { name: "Documentation Freshness", value: 82, color: "bg-emerald-500" },
      ],
    },
    {
      name: "Sentinel",
      color: "bg-amber-500",
      metrics: [
        { name: "Documentation Coverage", value: 90, color: "bg-emerald-500" },
        { name: "Question Answer Rate", value: 95, color: "bg-emerald-500" },
        { name: "Documentation Freshness", value: 88, color: "bg-emerald-500" },
      ],
    },
  ])

  const getColorClass = (value: number) => {
    if (value >= 80) return "bg-emerald-500"
    if (value >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div key={project.name} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className={`w-5 h-5 ${project.color} rounded-full mr-2`}></div>
            <h4 className="text-base font-medium text-gray-800">{project.name}</h4>
          </div>
          <div className="space-y-4">
            {project.metrics.map((metric) => (
              <div key={metric.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{metric.name}</span>
                  <span className="text-gray-500">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className={getColorClass(metric.value)} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
