import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import GoogleAnalytics from "@/components/GoogleAnalytics.tsx";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import SubmitTestimonial from "./pages/SubmitTestimonial.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminTestimonials from "./pages/AdminTestimonials.tsx";
import Trainings from "./pages/Trainings.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import CookieConsent from "@/components/CookieConsent.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GoogleAnalytics />
        <Routes>

          <Route path="/" element={<Index />} />
          <Route path="/testimonial" element={<SubmitTestimonial />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
