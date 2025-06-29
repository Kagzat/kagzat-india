
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Waitlist from "./pages/Waitlist";
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
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/signup/user" element={<UserSignup />} />
          <Route path="/signup/validator" element={<ValidatorSignup />} />
          <Route path="/signup/organization" element={<OrganizationSignup />} />
          <Route path="/onboarding/user" element={<UserOnboarding />} />
          <Route path="/onboarding/validator" element={<ValidatorOnboarding />} />
          <Route path="/onboarding/organization" element={<OrganizationOnboarding />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/search" element={<Search />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
