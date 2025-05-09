import { Button } from "@/components/ui/button"
import { Home, Star, Clock, FileText, Users, Settings, PlusCircle, ChevronRight, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function SpacesSidebar() {
  return (
    <div className="w-56 bg-gray-100 border-r border-gray-200 flex flex-col h-full">
      <div className="p-3">
        <Button variant="outline" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </div>

      <div className="px-3 py-2">
        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-2">
          <span>SHORTCUTS</span>
        </div>
        <ul className="space-y-1">
          <li>
            <Link
              href="/starred"
              className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200"
            >
              <Star className="mr-2 h-4 w-4 text-gray-500" />
              Starred
            </Link>
          </li>
          <li>
            <Link
              href="/recent"
              className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200"
            >
              <Clock className="mr-2 h-4 w-4 text-gray-500" />
              Recent
            </Link>
          </li>
          <li>
            <Link
              href="/drafts"
              className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200"
            >
              <FileText className="mr-2 h-4 w-4 text-gray-500" />
              Drafts
            </Link>
          </li>
        </ul>
      </div>

      <div className="px-3 py-2 flex-1 overflow-auto">
        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-2">
          <span>SPACES</span>
          <Button variant="ghost" size="icon" className="h-5 w-5">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>

        <ul className="space-y-1">
          <li>
            <div className="flex items-center justify-between text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-xs font-medium">E</span>
                </div>
                <span>Engineering</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
            <ul className="ml-7 mt-1 space-y-1">
              <li>
                <Link
                  href="/spaces/engineering/architecture"
                  className="block text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200"
                >
                  Architecture
                </Link>
              </li>
              <li>
                <Link
                  href="/spaces/engineering/backend"
                  className="block text-sm text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200"
                >
                  Backend
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <div className="flex items-center justify-between text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center mr-2">
                  <span className="text-green-600 text-xs font-medium">M</span>
                </div>
                <span>Marketing</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </div>
          </li>

          <li>
            <div className="flex items-center justify-between text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center mr-2">
                  <span className="text-purple-600 text-xs font-medium">P</span>
                </div>
                <span>Product</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </div>
          </li>

          <li>
            <div className="flex items-center justify-between text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-amber-100 rounded flex items-center justify-center mr-2">
                  <span className="text-amber-600 text-xs font-medium">H</span>
                </div>
                <span>HR</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-auto border-t border-gray-200 p-3">
        <ul className="space-y-1">
          <li>
            <Link
              href="/people"
              className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200"
            >
              <Users className="mr-2 h-4 w-4 text-gray-500" />
              People
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex items-center text-sm text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-200"
            >
              <Settings className="mr-2 h-4 w-4 text-gray-500" />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
