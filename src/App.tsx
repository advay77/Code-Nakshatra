import NavbarSection from "./components/navbar"
import DashboardSection from "./components/dashboard-section"
import { BrowserRouter,Routes, Route } from "react-router-dom"
import Dashboard from "./components/dashboard-section"
import Farmer from "./components/farmer"
import Buyer from "./components/buyer"
import Products from "./components/Products"
import AiFarmer from "./components/AiFarmer"
import News from "./components/News"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
        <BrowserRouter>

<Routes>
  <Route path="/" element={<Dashboard/>} />
  <Route path="/farmer" element={<Farmer/>} />
  <Route path="/buyer" element={<Buyer/>} />
  <Route path="/ai" element={<AiFarmer/>} />
<Route path="/news" element={<News/>}/>
  <Route path="/products" element={<Products/>} />

  
</Routes>
</BrowserRouter>
 
    </div>
  )
}

export default App

