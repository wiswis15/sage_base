"use client"

import { useState } from "react"
import { Bell, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Notification = {
  id: string
  type: "alert" | "info" | "success"
  title: string
  message: string
  time: string
  read: boolean
  actionUrl?: string
  count?: number
}

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "3",
      type: "info",
      title: "Document's automatic update Notification",
      message: "Authentication Service Architecture.md was updated automatically",
      time: "Yesterday",
      read: true,
      actionUrl: "/documents/1",
    },
    {
      id: "1",
      type: "alert",
      title: "Unanswered Question Alert",
      message: "How to implement rate limiting in the Atlas API?",
      time: "2 hours ago",
      read: false,
      actionUrl: "/questions/5",
      count: 5,
    },
    {
      id: "2",
      type: "alert",
      title: "Unanswered Question Alert",
      message: "How to debug the WebSocket connection in Pulse?",
      time: "4 hours ago",
      read: false,
      actionUrl: "/questions/7",
      count: 3,
    },
    {
      id: "4",
      type: "alert",
      title: "Unanswered Question Alert",
      message: "What's the best way to handle file uploads in Nova?",
      time: "1 day ago",
      read: false,
      actionUrl: "/questions/3",
      count: 4,
    },
    {
      id: "5",
      type: "success",
      title: "Question Answered",
      message: "Your question about CI/CD pipeline was answered by Alex",
      time: "2 days ago",
      read: true,
      actionUrl: "/questions/12",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const approveUpdate = (id: string) => {
    // In a real app, this would call an API to approve the update
    console.log(`Approved update with id: ${id}`)
    // Remove the notification after approval
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "info":
        return <Bell className="h-5 w-5 text-blue-500" />
      case "success":
        return <Bell className="h-5 w-5 text-emerald-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={toggleDropdown} className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-800">Notifications</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                Mark all as read
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? "bg-gray-50" : ""}`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4
                            className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                        {notification.count && (
                          <p className="text-xs text-amber-600 mb-2">
                            Has been asked {notification.count} times this week with no answer
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex space-x-2">
                            <Link href={notification.actionUrl || "#"}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-7 px-2 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                              >
                                View Details
                              </Button>
                            </Link>
                            {notification.title.includes("automatic update") && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => approveUpdate(notification.id)}
                                className="text-xs h-7 px-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                Approve
                              </Button>
                            )}
                          </div>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs h-7 px-2 text-gray-500"
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-200 text-center">
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="text-sm text-emerald-600 hover:text-emerald-700">
                View All Notifications
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
