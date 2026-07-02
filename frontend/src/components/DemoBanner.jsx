import React from 'react'

export const DemoBanner = () => (
  <div className="bg-yellow-50 border-b-2 border-yellow-400 px-4 py-3">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-yellow-800 font-semibold">📱 DEMO MODE:</span>
        <span className="text-yellow-700 ml-2">Using mock data. Backend will be connected later.</span>
      </div>
    </div>
  </div>
)

export default DemoBanner