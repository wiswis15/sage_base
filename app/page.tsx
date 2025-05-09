import SideNavigation from "@/components/side-navigation"
import TopNavigation from "@/components/top-navigation"
import SimplifiedSearch from "@/components/simplified-search"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <SideNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to SageBase</h1>
              <p className="text-gray-600 text-lg">
                Your company already knows the answer. SageBase helps you find it.
              </p>
            </div>

            {/* Simplified Search - Only Component */}
            <SimplifiedSearch />
          </div>
        </main>
      </div>
    </div>
  )
}
