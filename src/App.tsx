import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "@/context/ProductContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { StoreProvider } from "./context/StoreContext";
import { FontProvider } from "./context/FontContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProductProvider>
      <CurrencyProvider>
        <FontProvider>
          <StoreProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/adminpanel" element={<Admin />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </StoreProvider>
        </FontProvider>
      </CurrencyProvider>
    </ProductProvider>
  </QueryClientProvider>
);

export default App;