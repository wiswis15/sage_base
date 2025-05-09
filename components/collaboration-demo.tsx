"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function CollaborationDemo() {
  const [users, setUsers] = useState([
    { id: 1, name: "Sarah J", color: "bg-pink-500", position: 20 },
    { id: 2, name: "Michael C", color: "bg-blue-500", position: 40 },
    { id: 3, name: "Alex R", color: "bg-amber-500", position: 60 },
  ])

  // Simulate cursor movement
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          position: Math.max(10, Math.min(90, user.position + (Math.random() * 10 - 5))),
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-lg border border-blue-200 p-4">
      <div className="flex items-center space-x-2 mb-3">
        <div className="text-xs font-medium text-gray-500">Currently editing:</div>
        <div className="flex -space-x-2">
          {users.map((user) => (
            <Avatar key={user.id} className="h-6 w-6 border-2 border-white">
              <AvatarFallback className={`${user.color} text-white text-xs`}>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      <div className="relative bg-gray-100 rounded p-3 text-sm text-gray-700 min-h-[100px]">
        <p>
          This is a collaborative document that multiple team members can edit simultaneously. Changes are synced in
          real-time across all users.
        </p>
        <p className="mt-2">
          The platform tracks cursor positions and edits, making it easy to see who's working on what section.
        </p>

        {/* Simulated cursors */}
        {users.map((user) => (
          <div
            key={user.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${user.position}%`,
              top: user.id === 1 ? "20%" : user.id === 2 ? "50%" : "80%",
              transform: "translateX(-50%)",
            }}
          >
            <div className={`h-4 w-0.5 ${user.color}`}></div>
            <div className={`text-xs text-white ${user.color} px-1.5 py-0.5 rounded`}>{user.name}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-500 flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
        <span>All changes saved</span>
      </div>
    </div>
  )
}
