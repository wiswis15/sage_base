import { Button } from "@/components/ui/button"
import { Calendar, Download, Filter } from "lucide-react"
import SideNavigation from "@/components/side-navigation"
import InsightsQuestionStatus from "@/components/insights/insights-question-status"
import InsightsTopQuestions from "@/components/insights/insights-top-questions"
import InsightsUnansweredQuestions from "@/components/insights/insights-unanswered-questions"
import InsightsTopicDistribution from "@/components/insights/insights-topic-distribution"
import InsightsProjectOverview from "@/components/insights/insights-project-overview"
import TopNavigation from "@/components/top-navigation"

export default function InsightsPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <SideNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation />

        {/* Insights Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-end space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Calendar className="mr-1.5 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-1.5 h-4 w-4" />
              All Projects
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Download className="mr-1.5 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Knowledge Insights</h2>
              <p className="text-gray-600">
                Track knowledge usage, identify gaps, and monitor documentation health across your software projects.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">Total Questions</div>
                <div className="text-3xl font-bold text-gray-800">1,247</div>
                <div className="text-sm text-emerald-600 mt-1">↑ 12% from last week</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">Top Question</div>
                <div className="text-lg font-medium text-gray-800 truncate">"How to configure OAuth in Atlas?"</div>
                <div className="text-sm text-gray-500 mt-1">Asked 47 times this week</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">Unanswered Questions</div>
                <div className="text-3xl font-bold text-amber-600">23</div>
                <div className="text-sm text-gray-500 mt-1">In the last 24 hours</div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">Docs Updated/Created</div>
                <div className="text-3xl font-bold text-gray-800">89</div>
                <div className="text-sm text-emerald-600 mt-1">↑ 8% from last month</div>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Questions: Answered vs. Unanswered</h3>
                <InsightsQuestionStatus />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Topics</h3>
                <InsightsTopicDistribution />
              </div>
            </div>

            {/* Top Questions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Questions (Last 7 Days)</h3>
              <InsightsTopQuestions />
            </div>

            {/* Unanswered Questions */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Questions With No Answers (Last 24 Hours)</h3>
              <InsightsUnansweredQuestions />
            </div>

            {/* Project Overview */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Knowledge Health</h3>
              <InsightsProjectOverview />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
