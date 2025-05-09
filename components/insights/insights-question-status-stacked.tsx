"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function InsightsQuestionStatusStacked() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const mockData = [
      { date: "May 1", answered: 98, unanswered: 34, total: 132 },
      { date: "May 2", answered: 87, unanswered: 34, total: 121 },
      { date: "May 3", answered: 107, unanswered: 38, total: 145 },
      { date: "May 4", answered: 126, unanswered: 36, total: 162 },
      { date: "May 5", answered: 123, unanswered: 34, total: 157 },
      { date: "May 6", answered: 76, unanswered: 22, total: 98 },
      { date: "May 7", answered: 63, unanswered: 22, total: 85 },
      { date: "May 8", answered: 92, unanswered: 31, total: 123 },
      { date: "May 9", answered: 112, unanswered: 33, total: 145 },
      { date: "May 10", answered: 135, unanswered: 32, total: 167 },
      { date: "May 11", answered: 152, unanswered: 33, total: 185 },
      { date: "May 12", answered: 136, unanswered: 36, total: 172 },
      { date: "May 13", answered: 88, unanswered: 22, total: 110 },
      { date: "May 14", answered: 74, unanswered: 21, total: 95 },
    ]
    setData(mockData)
  }, [])

  // Calculate answer rate for each day
  const dataWithRate = data.map((item) => ({
    ...item,
    answerRate: item.total > 0 ? Math.round((item.answered / item.total) * 100) : 0,
  }))

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dataWithRate} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
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
            formatter={(value, name, props) => {
              if (name === "answerRate") return [`${value}%`, "Answer Rate"]
              return [value, name === "answered" ? "Answered" : "Unanswered"]
            }}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend
            wrapperStyle={{ paddingTop: "10px" }}
            formatter={(value) => {
              if (value === "answerRate") return <span className="text-xs">Answer Rate</span>
              return <span className="text-xs capitalize">{value}</span>
            }}
          />
          <Bar dataKey="answered" name="Answered" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} barSize={30} />
          <Bar dataKey="unanswered" name="Unanswered" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
          {/* Line for answer rate */}
          <Bar
            dataKey="answerRate"
            name="answerRate"
            yAxisId="right"
            fill="none"
            stroke="#6366f1"
            strokeWidth={2}
            strokeDasharray="5 5"
            legendType="line"
            barSize={0}
          />
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
        <div className="flex items-center">
          <div className="w-3 h-3 border border-indigo-500 bg-white rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Answer Rate</span>
        </div>
      </div>
    </div>
  )
}
