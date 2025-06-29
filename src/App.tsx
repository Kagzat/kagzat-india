
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Waitlist from "./pages/Waitlist";
import SignIn from "./pages/SignIn";
import RoleSelection from "./pages/RoleSelection";
import UserSignup from "./pages/UserSignup";
import ValidatorSignup from "./pages/ValidatorSignup";
import OrganizationSignup from "./pages/OrganizationSignup";
import UserOnboarding from "./pages/UserOnboarding";
import ValidatorOnboarding from "./pages/ValidatorOnboarding";
import OrganizationOnboarding from "./pages/OrganizationOnboarding";
import FormBuilder from "./pages/FormBuilder";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import AutoFillDemo from "./pages/AutoFillDemo";
import DocumentVerification from "./pages/DocumentVerification";
import ValidatorDashboard from "./pages/ValidatorDashboard";
import UserDashboard from "./pages/UserDashboard";
import OrganizationDashboard from "./pages/OrganizationDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/signup/user" element={<UserSignup />} />
          <Route path="/signup/validator" element={<ValidatorSignup />} />
          <Route path="/signup/organization" element={<OrganizationSignup />} />
          <Route path="/onboarding/user" element={<UserOnboarding />} />
          <Route path="/onboarding/validator" element={<ValidatorOnboarding />} />
          <Route path="/onboarding/organization" element={<OrganizationOnboarding />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/search" element={<Search />} />
          <Route path="/autofill-demo" element={<AutoFillDemo />} />
          <Route path="/document-verification" element={<DocumentVerification />} />
          <Route path="/validator-dashboard" element={<ValidatorDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
