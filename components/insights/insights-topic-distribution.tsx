"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export default function InsightsTopicDistribution() {
  const [data, setData] = useState<any[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
    index: number
  }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={activeIndex === index ? "#fff" : "transparent"}
                strokeWidth={activeIndex === index ? 2 : 0}
                style={{
                  filter: activeIndex === index ? "drop-shadow(0 0 4px rgba(0,0,0,0.3))" : "none",
                  opacity: activeIndex === null || activeIndex === index ? 1 : 0.7,
                  transition: "opacity 0.3s, filter 0.3s",
                }}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value} questions`, name]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: "20px" }}
            formatter={(value: string) => <span className="text-xs text-gray-700">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
