import { BarChart } from "lucide-react"
import Link from "next/link"

export default function InsightsSummary() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-2 rounded-lg mr-4">
          <BarChart className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Knowledge Insights</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Track knowledge usage, identify gaps, and monitor documentation health across your software projects.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <h4 className="text-sm text-gray-500 mb-1">Total Questions</h4>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">1,247</span>
            <span className="ml-2 text-sm text-emerald-600">↑ 12% from last week</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm text-gray-500 mb-1">Unanswered Questions</h4>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-amber-600">23</span>
            <span className="ml-2 text-sm text-gray-500">In the last 24 hours</span>
          </div>
        </div>
      </div>

      <Link href="/insights" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
        View all insights →
      </Link>
    </div>
  )
}
