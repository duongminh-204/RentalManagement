import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage } from './features/auth';
import { Dashboard } from './features/dashboard';
import RoomsPage from "./features/rooms/pages/RoomsPage";
import { PrivateRoute } from './routes/PrivateRoute';     


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/rooms" element={<RoomsPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
   
      </Routes>
    </Router>
  );
}

export default App;