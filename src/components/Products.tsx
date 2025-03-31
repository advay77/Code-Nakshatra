"use client"

import { useState, useRef } from "react"
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"
import {
  ShoppingCart,
  Heart,
  Star,
  Search,
  Leaf,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
  Upload,
  BarChart,
  Package,
  Users,
  Settings,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowUpRight,
} from "lucide-react"

// Types
interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  rating: number
  farmer: string
  unit: string
  description: string
  stock?: number
  sales?: number[]
}

interface CartItem {
  product: Product
  quantity: number
}

interface Order {
  id: number
  date: string
  status: "Processing" | "Delivered" | "Cancelled"
  items: {
    product: Product
    quantity: number
  }[]
  total: number
  address: string
}

// Generate sample data
const generateProducts = (): Product[] => {
  const categories = ["Vegetables", "Fruits", "Dairy", "Grains", "Herbs", "Honey"]
  const units = ["kg", "bunch", "pint", "oz", "each"]
  const farmers = [
    "Green Valley Farms",
    "Sunshine Orchards",
    "Root Valley Farm",
    "Berry Fields",
    "Meadow Dairy",
    "Harvest Moon Organics",
  ]

  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: [
      "Organic Tomatoes",
      "Fresh Carrots",
      "Golden Bananas",
      "Farm Butter",
      "Organic Yogurt",
      "Fresh Strawberries",
      "Crisp Lettuce",
      "Local Honey",
      "Fresh Mint",
      "Organic Milk",
      "Free Range Eggs",
      "Whole Grain Bread",
      "Sweet Corn",
      "Red Potatoes",
      "Green Beans",
      "Fresh Basil",
      "Organic Apples",
      "Fresh Peaches",
      "Ripe Avocados",
      "Garden Peas",
    ][i % 20],
    category: categories[i % categories.length],
    price: Number((Math.random() * 500 + 50).toFixed(2)), // Higher prices for INR
    image:
      [
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
        "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
        "https://images.unsplash.com/photo-1518635017498-87f514b751ba",
        "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e",
        "https://images.unsplash.com/photo-1550828520-4cb496926fc9",
      ][i % 6] + "?auto=format&fit=crop&q=80&w=500",
    rating: Number((Math.random() * (5 - 4) + 4).toFixed(1)),
    farmer: farmers[i % farmers.length],
    unit: units[i % units.length],
    description: "Locally sourced and sustainably grown.",
    stock: Math.floor(Math.random() * 100) + 10,
    sales: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 10),
  }))
}

const generateOrders = (products: Product[]): Order[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    date: new Date(2025, i % 12, Math.floor(Math.random() * 28) + 1).toISOString().split("T")[0],
    status: ["Processing", "Delivered", "Cancelled"][i % 3] as Order["status"],
    items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
      product: products[Math.floor(Math.random() * products.length)],
      quantity: Math.floor(Math.random() * 3) + 1,
    })),
    total: Math.random() * 5000 + 500, // Higher totals for INR
    address: "456 Oak Ave, Mumbai, MH 400001",
  }))
}

const products = generateProducts()
const orders = generateOrders(products)

// CSS for background animations and styling
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes floatingLeaves {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes growShrink {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }

  @keyframes barGrow {
    from { height: 0; }
    to { height: var(--bar-height); }
  }

  @keyframes lineGrow {
    from { stroke-dashoffset: 1000; }
    to { stroke-dashoffset: 0; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-fadeInUp {
    animation: slideInUp 0.8s ease forwards;
    opacity: 0;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-spin-slow {
    animation: spin 20s linear infinite;
  }

  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }

  .animate-bar-grow {
    animation: barGrow 1s ease-out forwards;
  }

  .animate-line-grow {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: lineGrow 2s ease-out forwards;
  }

  .hero-section {
    position: relative;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?auto=format&fit=crop&q=80') no-repeat center center;
    background-size: cover;
    overflow: hidden;
  }

  .farmer-bg {
    position: relative;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), 
                url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80') no-repeat center center;
    background-size: cover;
    overflow: hidden;
  }

  .hero-section::before, .farmer-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(0,100,0,0.2) 0%, rgba(0,0,0,0.4) 100%);
  }

  .floating-leaf {
    position: absolute;
    width: 30px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    animation: floatingLeaves 15s linear infinite;
  }

  .category-tag {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    font-weight: 600;
  }

  .product-card {
    animation: fadeIn 0.5s ease forwards;
    opacity: 0;
  }

  .nav-link {
    color: #4b5563;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-link:hover {
    color: #059669;
  }

  .cart-drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100vh;
    background: white;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 100;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    overflow-y: auto;
  }

  .cart-drawer.open {
    transform: translateX(0);
  }

  .cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out;
  }

  .cart-overlay.open {
    opacity: 1;
    visibility: visible;
  }

  .chart-bar {
    transition: height 1s ease-out;
  }

  .analytics-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .analytics-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .farmer-product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .farmer-product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`

// Components
function CartDrawer({ isOpen, onClose, cartItems, updateQuantity, removeFromCart }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  return (
    <>
      <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-6 h-6" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-gray-600">
                        ₹{item.product.price} per {item.product.unit}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₹{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">₹50.00</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">₹{(calculateTotal() + 50).toFixed(2)}</span>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

function Navigation({ isFarmer, setIsFarmer, cartItems, toggleCart }) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-green-600">
            FarmFresh
          </Link>
          <div className="flex items-center space-x-8">
            {!isFarmer ? (
              <>
                <Link to="/browse" className="nav-link">
                  Browse
                </Link>
                <Link to="/orders" className="nav-link">
                  My Orders
                </Link>
                <button
                  onClick={toggleCart}
                  className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">Cart</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/products" className="nav-link">
                  My Products
                </Link>
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </>
            )}
            <button
              onClick={() => setIsFarmer(!isFarmer)}
              className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              Switch to {isFarmer ? "Buyer" : "Farmer"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const navigate = useNavigate()

  // Create floating leaves effect
  const leaves = Array.from({ length: 15 }, (_, i) => {
    const delay = Math.random() * 10
    const duration = 15 + Math.random() * 20
    const size = 20 + Math.random() * 20
    const left = Math.random() * 100

    return (
      <div
        key={i}
        className="floating-leaf"
        style={{
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23059669"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8 0-1.7.5-3.3 1.5-4.6.9 1.5 2.5 2.6 4.3 2.6 2.8 0 5-2.2 5-5 0-.6-.1-1.2-.3-1.7 1.5.7 2.7 1.9 3.5 3.3.5 1 .9 2.2.9 3.4.1 4.4-3.5 8-7.9 8z"/></svg>')`,
        }}
      />
    )
  })

  return (
    <div className="hero-section h-[600px] flex items-center justify-center text-center text-white">
      {leaves}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-5xl font-bold mb-4 animate-fadeInUp">From Our Fields to Your Table</h1>
        <p className="text-xl mb-8 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          Supporting local farmers and bringing you the freshest harvest daily
        </p>
        <button
          onClick={() => navigate("/browse")}
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors animate-fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          Browse Fresh Produce
        </button>
      </div>
    </div>
  )
}

function ProductsGrid({ addToCart, favorites, toggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortOption, setSortOption] = useState("Featured")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return a.price - b.price
      case "Price: High to Low":
        return b.price - a.price
      case "Rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search fresh produce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
        </div>
        <div className="flex gap-4">
          <select
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Dairy</option>
            <option>Grains</option>
            <option>Herbs</option>
            <option>Honey</option>
          </select>
          <select
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} of{" "}
        {sortedProducts.length} products
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {currentProducts.map((product, index) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              <span className="absolute top-4 left-4 category-tag bg-green-600">{product.category}</span>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${favorites.includes(product.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{product.farmer}</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">
                  ₹{product.price}/{product.unit}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mb-12">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page ? "bg-green-600 text-white" : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function Orders() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p className="text-gray-600">Placed on {order.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "Processing"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-gray-600">
                      ₹{item.product.price} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Total</p>
                <p className="text-xl font-bold">₹{order.total.toFixed(2)}</p>
              </div>
              <p className="text-gray-600 mt-2">Shipping Address: {order.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FarmerDashboard() {
  // Create floating leaves effect for farmer dashboard
  const leaves = Array.from({ length: 10 }, (_, i) => {
    const delay = Math.random() * 10
    const duration = 15 + Math.random() * 20
    const size = 20 + Math.random() * 20
    const left = Math.random() * 100

    return (
      <div
        key={i}
        className="floating-leaf"
        style={{
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23059669"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8 0-1.7.5-3.3 1.5-4.6.9 1.5 2.5 2.6 4.3 2.6 2.8 0 5-2.2 5-5 0-.6-.1-1.2-.3-1.7 1.5.7 2.7 1.9 3.5 3.3.5 1 .9 2.2.9 3.4.1 4.4-3.5 8-7.9 8z"/></svg>')`,
        }}
      />
    )
  })

  return (
    <>
      <div className="farmer-bg h-[300px] flex items-center justify-center text-center text-white">
        {leaves}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-4 animate-fadeInUp">Farmer Dashboard</h1>
          <p className="text-xl mb-4 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            Manage your farm products and track your sales
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md analytics-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Total Products</h3>
            </div>
            <p className="text-3xl font-bold">24</p>
            <p className="text-green-600 text-sm">↑ 12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md analytics-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Total Customers</h3>
            </div>
            <p className="text-3xl font-bold">156</p>
            <p className="text-blue-600 text-sm">↑ 8% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md analytics-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <BarChart className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold">Revenue</h3>
            </div>
            <p className="text-3xl font-bold">₹28,450</p>
            <p className="text-yellow-600 text-sm">↑ 15% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md analytics-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">Orders</h3>
            </div>
            <p className="text-3xl font-bold">89</p>
            <p className="text-purple-600 text-sm">↑ 10% from last month</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Upload New Product</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Select category</option>
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Dairy</option>
                  <option>Grains</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                placeholder="Enter product description"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Select unit</option>
                  <option>kg</option>
                  <option>g</option>
                  <option>piece</option>
                  <option>bunch</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Available</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Drag and drop images here, or click to select files</p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Upload Product
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

function FarmerProducts() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortOption, setSortOption] = useState("Featured")

  // Filter to only show products from "Green Valley Farms" as if they belong to this farmer
  const farmerProducts = products.filter((product) => product.farmer === "Green Valley Farms")

  const filteredProducts = farmerProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return a.price - b.price
      case "Price: High to Low":
        return b.price - a.price
      case "Stock: Low to High":
        return a.stock - b.stock
      case "Stock: High to Low":
        return b.stock - a.stock
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Products</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          + Add New Product
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search your products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
        </div>
        <div className="flex gap-4">
          <select
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Dairy</option>
            <option>Grains</option>
            <option>Herbs</option>
            <option>Honey</option>
          </select>
          <select
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Stock: Low to High</option>
            <option>Stock: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid mb-8">
        {sortedProducts.map((product) => (
          <div key={product.id} className="farmer-product-card">
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              <span className="absolute top-4 left-4 category-tag bg-green-600">{product.category}</span>
              <div className="absolute top-4 right-4 px-2 py-1 bg-white rounded-lg text-sm font-medium">
                Stock: {product.stock}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">
                  ₹{product.price}/{product.unit}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Settings className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FarmerAnalytics() {
  const chartRef = useRef(null)
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [selectedTimeframe, setSelectedTimeframe] = useState("Monthly")

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const topProducts = products.slice(0, 5)

  // Sample data for charts
  const monthlySales = selectedProduct.sales || Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 10)
  const monthlyRevenue = monthlySales.map((sale) => sale * selectedProduct.price)

  // Calculate max value for scaling
  const maxSales = Math.max(...monthlySales)
  const maxRevenue = Math.max(...monthlyRevenue)

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md col-span-1 analytics-card">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedProduct.id === product.id ? "bg-green-50 border border-green-200" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedProduct(product)}
              >
                <span className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {index + 1}
                </span>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-600">
                    ���{product.price}/{product.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{product.sales ? product.sales.reduce((a, b) => a + b, 0) : 0} sold</p>
                  <p className="text-sm text-gray-600">
                    ₹{product.sales ? (product.sales.reduce((a, b) => a + b, 0) * product.price).toFixed(0) : 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md col-span-2 analytics-card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">{selectedProduct.name} Performance</h3>
              <p className="text-gray-600">Sales and revenue analysis</p>
            </div>
            <select
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>

          <div className="h-64 relative">
            <div className="absolute left-0 bottom-0 top-0 flex flex-col justify-between text-xs text-gray-600">
              <span>₹{maxRevenue.toFixed(0)}</span>
              <span>₹{(maxRevenue / 2).toFixed(0)}</span>
              <span>₹0</span>
            </div>
            <div className="absolute right-0 bottom-0 top-0 flex flex-col justify-between text-xs text-gray-600">
              <span>{maxSales} units</span>
              <span>{Math.floor(maxSales / 2)} units</span>
              <span>0 units</span>
            </div>
            <div className="ml-8 mr-8 h-full flex items-end justify-between">
              {months.map((month, i) => (
                <div key={month} className="flex flex-col items-center gap-1 w-full">
                  <div className="w-full flex justify-center gap-1">
                    <div
                      className="w-3 bg-green-600 rounded-t-sm animate-bar-grow"
                      style={{
                        height: `${(monthlySales[i] / maxSales) * 100}%`,
                        "--bar-height": `${(monthlySales[i] / maxSales) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="w-3 bg-blue-500 rounded-t-sm animate-bar-grow"
                      style={{
                        height: `${(monthlyRevenue[i] / maxRevenue) * 100}%`,
                        "--bar-height": `${(monthlyRevenue[i] / maxRevenue) * 100}%`,
                        animationDelay: "0.2s",
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{month}</span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-[-30px] left-0 right-0 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                <span className="text-xs text-gray-600">Units Sold</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span className="text-xs text-gray-600">Revenue</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md analytics-card">
          <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
          <div className="h-64 relative flex items-center justify-center">
            <svg width="250" height="250" viewBox="0 0 100 100" className="animate-spin-slow">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#059669"
                strokeWidth="10"
                strokeDasharray="282.7"
                strokeDashoffset="70"
                className="animate-line-grow"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="10"
                strokeDasharray="282.7"
                strokeDashoffset="170"
                className="animate-line-grow"
                style={{ animationDelay: "0.5s" }}
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#eab308"
                strokeWidth="10"
                strokeDasharray="282.7"
                strokeDashoffset="240"
                className="animate-line-grow"
                style={{ animationDelay: "1s" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold">₹28,450</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
              <span className="text-sm">Vegetables (40%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-sm">Fruits (30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
              <span className="text-sm">Others (30%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md analytics-card">
          <h3 className="text-lg font-semibold mb-4">Customer Insights</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Repeat Customers</h4>
                <span className="text-green-600 font-medium">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full animate-bar-grow"
                  style={{ width: "68%", "--bar-height": "68%" }}
                ></div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">New Customers</h4>
                <span className="text-blue-600 font-medium">32%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full animate-bar-grow"
                  style={{ width: "32%", "--bar-height": "32%", animationDelay: "0.3s" }}
                ></div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Customer Satisfaction</h4>
                <span className="text-yellow-600 font-medium">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full animate-bar-grow"
                  style={{ width: "96%", "--bar-height": "96%", animationDelay: "0.6s" }}
                ></div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Order Completion Rate</h4>
                <span className="text-purple-600 font-medium">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-500 h-2.5 rounded-full animate-bar-grow"
                  style={{ width: "94%", "--bar-height": "94%", animationDelay: "0.9s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md analytics-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Growth Opportunities</h3>
          <button className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg hover:border-green-300 transition-colors">
            <div className="p-3 bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium mb-2">Organic Certification</h4>
            <p className="text-sm text-gray-600 mb-3">Increase product value with organic certification.</p>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">Learn more</button>
          </div>
          <div className="p-4 border rounded-lg hover:border-green-300 transition-colors">
            <div className="p-3 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium mb-2">Delivery Expansion</h4>
            <p className="text-sm text-gray-600 mb-3">Reach more customers with expanded delivery options.</p>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">Learn more</button>
          </div>
          <div className="p-4 border rounded-lg hover:border-green-300 transition-colors">
            <div className="p-3 bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="font-medium mb-2">Quality Assurance</h4>
            <p className="text-sm text-gray-600 mb-3">Implement quality standards to build customer trust.</p>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">Learn more</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isFarmer, setIsFarmer] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prevItems, { product, quantity: 1 }]
      }
    })
    setIsCartOpen(true)
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <Router>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="min-h-screen bg-gray-50">
        <Navigation isFarmer={isFarmer} setIsFarmer={setIsFarmer} cartItems={cartItems} toggleCart={toggleCart} />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/browse"
            element={<ProductsGrid addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard" element={<FarmerDashboard />} />
          <Route path="/products" element={<FarmerProducts />} />
          <Route path="/analytics" element={<FarmerAnalytics />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

