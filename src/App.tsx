import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Preview from "./pages/Preview";
import PreviewTeste from "./pages/PreviewTeste";
import PreviewAgencia from "./pages/PreviewAgencia";
import PreviewDentista from "./pages/PreviewDentista";
import EditorDentista from "./pages/EditorDentista";
import EditorAgencia from "./pages/EditorAgencia";
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
          <Route path="/preview" element={<Preview />} />
          <Route path="/preview-teste" element={<PreviewTeste />} />
          <Route path="/preview-agencia" element={<PreviewAgencia />} />
          <Route path="/preview-dentista" element={<PreviewDentista />} />
          <Route path="/editor-dentista" element={<EditorDentista />} />
          <Route path="/editor-agencia" element={<EditorAgencia />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
