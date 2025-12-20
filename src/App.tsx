import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage"; // Import the new page
import DashboardLayout from "./components/layout/DashboardLayout";
import AboutPage from "./pages/AboutPage";
import { AuthValidator } from "./utils/AuthValidation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        {/* 1. Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* 2. Auth Pages */}
        <Route element = {<AuthValidator/>}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        
        
        {/* 3. Protected Routes */}
        <Route element = {<AuthValidator/>}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;