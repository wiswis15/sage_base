import { FileText, Clock, Users, Star, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function RecentDocuments() {
  const recentDocuments = [
    {
      id: 1,
      title: "Authentication Service Architecture",
      space: "Atlas",
      spaceColor: "bg-blue-100",
      spaceTextColor: "text-blue-600",
      spaceInitial: "A",
      lastEdited: "10 minutes ago",
      editedBy: "You",
      starred: true,
      source: "confluence",
      techStack: ["Node.js", "Express", "JWT"],
      type: "Architecture",
    },
    {
      id: 2,
      title: "REST API Documentation v2.3",
      space: "Atlas",
      spaceColor: "bg-blue-100",
      spaceTextColor: "text-blue-600",
      spaceInitial: "A",
      lastEdited: "2 hours ago",
      editedBy: "Michael Chen",
      starred: false,
      source: "confluence",
      techStack: ["OpenAPI", "REST"],
      type: "Documentation",
    },
    {
      id: 3,
      title: "Frontend Component Library",
      space: "Nova",
      spaceColor: "bg-green-100",
      spaceTextColor: "text-green-600",
      spaceInitial: "N",
      lastEdited: "Yesterday",
      editedBy: "Sarah Johnson",
      starred: true,
      source: "confluence",
      techStack: ["React", "TypeScript", "Storybook"],
      type: "Development",
    },
    {
      id: 4,
      title: "CI/CD Pipeline Configuration",
      space: "Pulse",
      spaceColor: "bg-purple-100",
      spaceTextColor: "text-purple-600",
      spaceInitial: "P",
      lastEdited: "2 days ago",
      editedBy: "Alex Rodriguez",
      starred: false,
      source: "github",
      techStack: ["GitHub Actions", "Docker"],
      type: "DevOps",
    },
  ]

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "confluence":
        return null // No icon for native documents
      case "jira":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "slack":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "github":
        return <FileText className="h-4 w-4 text-gray-700" />
      case "email":
        return <FileText className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="divide-y divide-gray-100">
      {recentDocuments.map((doc) => (
        <div key={doc.id} className="py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-8 h-8 ${doc.spaceColor} rounded-md flex items-center justify-center mr-3`}>
              <span className={`${doc.spaceTextColor} font-medium`}>{doc.spaceInitial}</span>
            </div>
            <div>
              <div className="flex items-center">
                <Link href={`/documents/${doc.id}`} className="text-gray-800 font-medium hover:text-emerald-600">
                  {doc.title}
                </Link>
                {doc.source !== "confluence" && (
                  <span className="ml-2 inline-flex items-center">
                    {getSourceIcon(doc.source)}
                    <ArrowUpRight className="h-3 w-3 text-gray-400 ml-1" />
                  </span>
                )}
                <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">{doc.type}</span>
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <span>{doc.space}</span>
                <span className="mx-1.5">•</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{doc.lastEdited}</span>
                <span className="mx-1.5">•</span>
                <span>{doc.editedBy}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {doc.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600">
              <Users className="h-4 w-4" />
            </button>
            <button className={doc.starred ? "text-amber-400" : "text-gray-400 hover:text-gray-600"}>
              <Star className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
