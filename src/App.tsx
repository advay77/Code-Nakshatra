import { BrowserRouter,Routes, Route } from "react-router-dom"
import Dashboard from "./components/dashboard-section"
import Buyer from "./components/buyer"
import Products from "./components/Products"
import AiFarmer from "./components/AiFarmer"
import MarketPricing from "./components/MarketPricing"





function App() {
  return (
    <div className="min-h-screen flex flex-col">
        <BrowserRouter>

<Routes>
  <Route path="/" element={<Dashboard/>} />
  <Route path="/buyer" element={<Buyer/>} />
  <Route path="/ai" element={<AiFarmer/>} />
  <Route path="/pricing" element={<MarketPricing/>} />
  <Route path="/products" element={<Products/>} />
  
  
</Routes>
</BrowserRouter>
{/* 
<Products/> */}
 
    </div>
  )
}

export default App

