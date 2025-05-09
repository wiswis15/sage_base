"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function InsightsDocumentActivity() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const mockData = [
      { date: "Apr 15", created: 3, updated: 12 },
      { date: "Apr 16", created: 2, updated: 8 },
      { date: "Apr 17", created: 1, updated: 15 },
      { date: "Apr 18", created: 4, updated: 10 },
      { date: "Apr 19", created: 2, updated: 7 },
      { date: "Apr 20", created: 0, updated: 5 },
      { date: "Apr 21", created: 1, updated: 4 },
      { date: "Apr 22", created: 5, updated: 12 },
      { date: "Apr 23", created: 3, updated: 18 },
      { date: "Apr 24", created: 2, updated: 11 },
      { date: "Apr 25", created: 4, updated: 9 },
      { date: "Apr 26", created: 1, updated: 14 },
      { date: "Apr 27", created: 0, updated: 6 },
      { date: "Apr 28", created: 2, updated: 8 },
      { date: "Apr 29", created: 3, updated: 10 },
      { date: "Apr 30", created: 2, updated: 12 },
      { date: "May 1", created: 4, updated: 15 },
      { date: "May 2", created: 3, updated: 11 },
      { date: "May 3", created: 2, updated: 9 },
      { date: "May 4", created: 1, updated: 13 },
      { date: "May 5", created: 5, updated: 17 },
      { date: "May 6", created: 2, updated: 8 },
      { date: "May 7", created: 0, updated: 6 },
      { date: "May 8", created: 3, updated: 12 },
      { date: "May 9", created: 4, updated: 14 },
      { date: "May 10", created: 2, updated: 10 },
      { date: "May 11", created: 1, updated: 8 },
      { date: "May 12", created: 3, updated: 11 },
      { date: "May 13", created: 2, updated: 7 },
      { date: "May 14", created: 4, updated: 13 },
    ]
    setData(mockData)
  }, [])

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUpdated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b7280" }}
            tickFormatter={(value) => {
              // Only show every 5th tick to avoid crowding
              const index = data.findIndex((item) => item.date === value)
              return index % 5 === 0 ? value : ""
            }}
          />
          <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{ fill: "#6b7280" }} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
            }}
          />
          <Area
            type="monotone"
            dataKey="created"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorCreated)"
            name="Created"
          />
          <Area
            type="monotone"
            dataKey="updated"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#colorUpdated)"
            name="Updated"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-2 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Created</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Updated</span>
        </div>
      </div>
    </div>
  )
}
