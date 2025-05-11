import { BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InsightsWidget() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-4">
            <BarChart className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Knowledge Insights</h3>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Track knowledge usage, identify gaps, and monitor documentation health across your software projects.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-500 mb-1">Total Questions</div>
          <div className="text-2xl font-bold text-gray-800">1,247</div>
          <div className="text-xs text-emerald-600 mt-1">↑ 12% from last week</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-500 mb-1">Unanswered Questions</div>
          <div className="text-2xl font-bold text-red-600">23</div>
          <div className="text-xs text-gray-500 mt-1">In the last 24 hours</div>
        </div>
      </div>

      <Link href="/insights">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          <BarChart className="mr-2 h-4 w-4" /> View Insights Dashboard
        </Button>
      </Link>
    </div>
  )
}
