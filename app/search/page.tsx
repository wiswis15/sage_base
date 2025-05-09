import SideNavigation from "@/components/side-navigation"
import UnifiedSearch from "@/components/unified-search"
import TopNavigation from "@/components/top-navigation"

export default function SearchPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <SideNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Search Across All Platforms</h2>
              <p className="text-gray-600">
                Find knowledge from Confluence, Jira, Slack, GitHub, and Email using AI-powered search.
              </p>
            </div>

            {/* Unified Search */}
            <UnifiedSearch />

            {/* Search Tips */}
            <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Tips</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Advanced Search Syntax</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      <span className="font-medium">author:</span> Search by document author
                    </li>
                    <li>
                      <span className="font-medium">in:</span> Limit search to specific platform
                    </li>
                    <li>
                      <span className="font-medium">before: / after:</span> Filter by date
                    </li>
                    <li>
                      <span className="font-medium">"exact phrase"</span> Search for exact phrase
                    </li>
                    <li>
                      <span className="font-medium">-exclude</span> Exclude term from results
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Example Searches</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>
                      <span className="font-medium">authentication in:github</span> Find auth in GitHub
                    </li>
                    <li>
                      <span className="font-medium">api author:michael</span> API docs by Michael
                    </li>
                    <li>
                      <span className="font-medium">"deployment process" after:2023-01-01</span> Recent deployment docs
                    </li>
                    <li>
                      <span className="font-medium">database -postgres</span> Database docs excluding Postgres
                    </li>
                    <li>
                      <span className="font-medium">meeting notes in:slack</span> Meeting notes from Slack
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
