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
import CareHome from "./pages/care/CareHome.tsx";
import CareContact from "./pages/care/CareContact.tsx";
import CareServicePage from "./pages/care/CareServicePage.tsx";
import InpatientHospice from "./pages/care/InpatientHospice.tsx";
import Families from "./pages/care/Families.tsx";
import GettingCare from "./pages/care/GettingCare.tsx";
import { CARE_CONTACT } from "@/data/careNav";
import { careServices } from "@/data/careServices";
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
            {/* Tannjes Home & Hospice Care: the public front door */}
            <Route path="/" element={<CareHome />} />
            {careServices.map((s) => (
              <Route key={s.to} path={s.to} element={<CareServicePage service={s} />} />
            ))}
            <Route path="/inpatient-hospice" element={<InpatientHospice />} />
            <Route path="/families" element={<Families />} />
            <Route path="/getting-care" element={<GettingCare />} />
            <Route path={CARE_CONTACT} element={<CareContact />} />

            {/* Tannjes Clinics Hospital */}
            <Route path="/hospital" element={<Index />} />
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
