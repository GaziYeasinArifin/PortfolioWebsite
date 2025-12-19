import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScreenlifeCaseStudy from "./pages/ScreenlifeCaseStudy";
import PhantomFootprintCaseStudy from "./pages/PhantomFootprintCaseStudy";
import AddMusicToVideoCaseStudy from "./pages/AddMusicToVideoCaseStudy";
import SpotlightCaseStudy from "./pages/SpotlightCaseStudy";
import ComingSoon from "./pages/ComingSoon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study/screenlife" element={<ScreenlifeCaseStudy />} />
          <Route path="/case-study/phantom-footprint" element={<PhantomFootprintCaseStudy />} />
          <Route path="/case-study/add-music-to-video" element={<AddMusicToVideoCaseStudy />} />
          <Route path="/case-study/spotlight" element={<SpotlightCaseStudy />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
