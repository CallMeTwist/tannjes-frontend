import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Departments from "./pages/Departments.tsx";
import Facilities from "./pages/Facilities.tsx";
import Team from "./pages/Team.tsx";
import Contact from "./pages/Contact.tsx";
import DepartmentDetail from "./pages/DepartmentDetail.tsx";
import PatientRegister from "./pages/patient/Register.tsx";
import PatientLogin from "./pages/patient/Login.tsx";
import PatientPay from "./pages/patient/Pay.tsx";
import PatientPortal from "./pages/patient/Portal.tsx";
import PatientConsultations from "./pages/patient/Consultations.tsx";
import PatientResults from "./pages/patient/Results.tsx";
import NotFound from "./pages/NotFound.tsx";
import { PatientAuthProvider } from "@/hooks/usePatientAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PatientAuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:slug" element={<DepartmentDetail />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/patient/register" element={<PatientRegister />} />
            <Route path="/patient/login" element={<PatientLogin />} />
            <Route path="/patient/pay" element={<PatientPay />} />
            <Route path="/patient/portal" element={<PatientPortal />} />
            <Route path="/patient/portal/consultations" element={<PatientConsultations />} />
            <Route path="/patient/portal/results" element={<PatientResults />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PatientAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
