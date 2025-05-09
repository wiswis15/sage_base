"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function InsightsTotalQueries() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const mockData = [
      { date: "May 1", queries: 132 },
      { date: "May 2", queries: 121 },
      { date: "May 3", queries: 145 },
      { date: "May 4", queries: 162 },
      { date: "May 5", queries: 157 },
      { date: "May 6", queries: 98 },
      { date: "May 7", queries: 85 },
      { date: "May 8", queries: 123 },
      { date: "May 9", queries: 145 },
      { date: "May 10", queries: 167 },
      { date: "May 11", queries: 185 },
      { date: "May 12", queries: 172 },
      { date: "May 13", queries: 110 },
      { date: "May 14", queries: 95 },
    ]
    setData(mockData)
  }, [])

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
          <Tooltip
            cursor={{ fill: "rgba(236, 253, 245, 0.4)" }}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
            }}
          />
          <Bar dataKey="queries" fill="#10b981" radius={[4, 4, 0, 0]} name="Queries" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
