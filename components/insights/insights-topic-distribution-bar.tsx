"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export default function InsightsTopicDistributionBar() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const mockData = [
      { name: "Authentication", value: 124, color: "#10b981" }, // emerald-500
      { name: "API Integration", value: 85, color: "#3b82f6" }, // blue-500
      { name: "Frontend", value: 67, color: "#8b5cf6" }, // violet-500
      { name: "Database", value: 53, color: "#f59e0b" }, // amber-500
      { name: "DevOps", value: 42, color: "#ef4444" }, // red-500
      { name: "Security", value: 38, color: "#6366f1" }, // indigo-500
      { name: "Performance", value: 31, color: "#ec4899" }, // pink-500
      { name: "Other", value: 25, color: "#94a3b8" }, // slate-400
    ]
    setData(mockData)
  }, [])

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
          <Tooltip
            formatter={(value: number) => [`${value} questions`, "Count"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
