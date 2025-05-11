"use client"

export default function UnansweredQuestionsCard() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Unanswered Questions</h3>
      <div className="bg-gray-100 p-3 rounded-md mb-2">
        <span className="text-5xl font-bold text-red-600">23</span>
      </div>
      <p className="text-sm text-gray-500">In the last 24 hours</p>
    </div>
  )
}
