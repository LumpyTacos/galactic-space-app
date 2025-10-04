import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Header Tabs */}
        <header className="flex bg-gray-900 text-white items-center px-6 py-3 shadow-md">
          <h1 className="text-xl font-bold flex-1">NASA Bioscience Explorer</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            {/* Default to Dashboard */}
            <Route path="/" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-gray-300 text-center py-2 text-sm">
          © 2025 NASA Bioscience AI Dashboard
        </footer>
      </div>
    </Router>
  );
}