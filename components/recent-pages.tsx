import { Star, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function RecentPages() {
  const recentPages = [
    {
      id: 1,
      title: "Q2 Product Roadmap",
      space: "Product",
      spaceColor: "bg-purple-100",
      spaceTextColor: "text-purple-600",
      spaceInitial: "P",
      lastEdited: "10 minutes ago",
      editedBy: "You",
      starred: true,
    },
    {
      id: 2,
      title: "API Documentation",
      space: "Engineering",
      spaceColor: "bg-blue-100",
      spaceTextColor: "text-blue-600",
      spaceInitial: "E",
      lastEdited: "2 hours ago",
      editedBy: "Michael Chen",
      starred: false,
    },
    {
      id: 3,
      title: "Marketing Campaign Brief",
      space: "Marketing",
      spaceColor: "bg-green-100",
      spaceTextColor: "text-green-600",
      spaceInitial: "M",
      lastEdited: "Yesterday",
      editedBy: "Sarah Johnson",
      starred: true,
    },
    {
      id: 4,
      title: "Team Meeting Notes",
      space: "HR",
      spaceColor: "bg-amber-100",
      spaceTextColor: "text-amber-600",
      spaceInitial: "H",
      lastEdited: "2 days ago",
      editedBy: "Alex Rodriguez",
      starred: false,
    },
  ]

  return (
    <div className="divide-y divide-gray-100">
      {recentPages.map((page) => (
        <div key={page.id} className="py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-8 h-8 ${page.spaceColor} rounded-md flex items-center justify-center mr-3`}>
              <span className={`${page.spaceTextColor} font-medium`}>{page.spaceInitial}</span>
            </div>
            <div>
              <Link href={`/pages/${page.id}`} className="text-gray-800 font-medium hover:text-blue-600">
                {page.title}
              </Link>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <span>{page.space}</span>
                <span className="mx-1.5">•</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{page.lastEdited}</span>
                <span className="mx-1.5">•</span>
                <span>{page.editedBy}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600">
              <Users className="h-4 w-4" />
            </button>
            <button className={page.starred ? "text-amber-400" : "text-gray-400 hover:text-gray-600"}>
              <Star className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
