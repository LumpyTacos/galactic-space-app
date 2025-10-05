import './App.css'
import Header from './components/Header'

function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="w-full px-8 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Good Morning, Researcher</h1>
              <p className="text-gray-600">You have 3 new findings today</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">25 Nov 2024</p>
                <p className="text-xs text-gray-500">24H</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700">
                Weekly
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Section - 3D Model and Body Analysis */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 3D Heart Model */}
              <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center justify-center h-80">
                  <div className="text-center">
                    {/* 3D Heart Icon Placeholder */}
                    <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl">
                      <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-red-700 mb-2">Cardiovascular System</h3>
                    <p className="text-red-600 text-sm">Interactive 3D model for analysis</p>
                  </div>
                </div>
                
                {/* Model Selector */}
                <div className="flex justify-center gap-2 mt-6">
                  <div className="p-2 bg-white/30 rounded-lg">
                    <div className="w-8 h-8 bg-gray-400 rounded"></div>
                  </div>
                  <div className="p-2 bg-white rounded-lg shadow-md">
                    <div className="w-8 h-8 bg-red-500 rounded"></div>
                  </div>
                  <div className="p-2 bg-white/30 rounded-lg">
                    <div className="w-8 h-8 bg-gray-400 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Body Analysis Metrics */}
              <div className="space-y-4">
                {/* Patient Body Analysis Header */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      </div>
                      Research Analysis
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {/* Glucose Level */}
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Glucose Level</p>
                      <div className="text-2xl font-bold text-blue-600 mb-1">127<span className="text-sm text-gray-500">ml</span></div>
                      <div className="w-full h-8 bg-gray-100 rounded flex items-end p-1">
                        <div className="flex gap-px h-full items-end flex-1">
                          {[20, 40, 60, 80, 90, 70, 85].map((height, i) => (
                            <div key={i} className={`flex-1 bg-blue-400 rounded-sm opacity-${height}`} style={{height: `${height}%`}}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Cholesterol Level */}
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Cholesterol Level</p>
                      <div className="text-2xl font-bold text-blue-600 mb-1">164<span className="text-sm text-gray-500">mg</span></div>
                      <div className="w-full h-8 bg-gray-100 rounded flex items-end p-1">
                        <div className="flex gap-px h-full items-end flex-1">
                          {[30, 50, 70, 90, 85, 75, 95].map((height, i) => (
                            <div key={i} className={`flex-1 bg-blue-400 rounded-sm opacity-${height}`} style={{height: `${height}%`}}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Paracetamol */}
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">Paracetamol</p>
                      <div className="text-2xl font-bold text-purple-600 mb-1">35<span className="text-sm text-gray-500">%</span></div>
                      <div className="w-full h-8 bg-gray-100 rounded flex items-center">
                        <div className="w-8/12 h-3 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Heart Rate Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Heart Rate
                    </h4>
                    <button className="text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-sm text-gray-600">BPM</span>
                      <span className="text-xl font-bold text-gray-900 ml-2">120</span>
                      <span className="text-sm text-gray-600 ml-1">BPM</span>
                    </div>
                    <div className="flex-1 ml-4 h-12 flex items-end">
                      <svg className="w-full h-8" viewBox="0 0 100 32">
                        <polyline 
                          fill="none" 
                          stroke="#3B82F6" 
                          strokeWidth="2" 
                          points="0,16 10,16 15,8 20,24 25,16 30,16 35,12 40,20 45,16 50,16 55,10 60,22 65,16 70,16 75,14 80,18 85,16 90,16 100,16"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Cards */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Medication List */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  Research Areas
                </h3>
                <button className="text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">Cardiovascular Research</p>
                    <p className="text-xs text-gray-600">Effects of microgravity on heart function</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">Bone Density Studies</p>
                    <p className="text-xs text-gray-600">Strengthen musculoskeletal health</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-lg text-white">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Neurological Research</p>
                    <p className="text-xs text-white/80">Optimize cognitive performance</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">Plant Biology</p>
                    <p className="text-xs text-gray-600">Balance for space agriculture</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Schedule
                </h3>
                <button className="text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs text-gray-500 p-2">{day}</div>
                ))}
                {Array.from({length: 35}, (_, i) => (
                  <div key={i} className={`text-center text-xs p-2 rounded ${
                    i === 15 ? 'bg-blue-600 text-white' : 
                    i === 20 ? 'bg-blue-100 text-blue-600' : 
                    'text-gray-700 hover:bg-gray-100'
                  }`}>
                    {i < 7 ? '' : Math.floor(Math.random() * 30) + 1}
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">Dr. Selena Gomez</p>
                    <p className="text-xs text-gray-600">Cardiologist</p>
                  </div>
                  <button className="text-gray-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">Dr. Steven Nicholas</p>
                    <p className="text-xs text-gray-600">Neurology Specialist</p>
                  </div>
                  <button className="text-gray-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
