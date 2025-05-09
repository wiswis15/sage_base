"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function InsightsQuestionStatus() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const mockData = [
      { date: "May 1", answered: 98, unanswered: 34 },
      { date: "May 2", answered: 87, unanswered: 34 },
      { date: "May 3", answered: 107, unanswered: 38 },
      { date: "May 4", answered: 126, unanswered: 36 },
      { date: "May 5", answered: 123, unanswered: 34 },
      { date: "May 6", answered: 76, unanswered: 22 },
      { date: "May 7", answered: 63, unanswered: 22 },
      { date: "May 8", answered: 92, unanswered: 31 },
      { date: "May 9", answered: 112, unanswered: 33 },
      { date: "May 10", answered: 135, unanswered: 32 },
      { date: "May 11", answered: 152, unanswered: 33 },
      { date: "May 12", answered: 136, unanswered: 36 },
      { date: "May 13", answered: 88, unanswered: 22 },
      { date: "May 14", answered: 74, unanswered: 21 },
    ]
    setData(mockData)
  }, [])

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }} stackOffset="sign">
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6b7280" }}
            tickFormatter={(value) => {
              // Only show every other tick to avoid crowding
              const index = data.findIndex((item) => item.date === value)
              return index % 2 === 0 ? value : ""
            }}
          />
          <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{ fill: "#6b7280" }} />
          <Tooltip
            cursor={{ fill: "rgba(236, 253, 245, 0.4)" }}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "10px" }}
            formatter={(value) => <span className="text-xs capitalize">{value}</span>}
          />
          <Bar dataKey="answered" name="Answered" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="unanswered" name="Unanswered" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-2 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Answered</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Unanswered</span>
        </div>
      </div>
    </div>
  )
}
