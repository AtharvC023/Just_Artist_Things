"use client"

import { useState, useMemo } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import ProductGrid from "@/components/product-grid"
import ProductDetail from "@/components/product-detail"

const PRODUCTS = [
  {
    id: 1,
    name: "Marble Table Lamp",
    category: "Lighting",
    price: "$299",
    image: "/elegant-marble-table-lamp-premium.jpg",
    description: "Handcrafted marble base with brushed brass accents. Perfect for any luxury space.",
  },
  {
    id: 2,
    name: "Ceramic Vase Set",
    category: "Decor",
    price: "$189",
    image: "/modern-ceramic-vase-collection.jpg",
    description: "Three-piece ceramic vase set in natural earth tones.",
  },
  {
    id: 3,
    name: "Velvet Accent Chair",
    category: "Furniture",
    price: "$799",
    image: "/luxury-velvet-armchair-modern.jpg",
    description: "Luxurious velvet upholstery with solid wood frame.",
  },
  {
    id: 4,
    name: "Wall Art Canvas",
    category: "Art",
    price: "$459",
    image: "/abstract-wall-art-canvas-painting.jpg",
    description: "Large format canvas art piece. Ready to hang.",
  },
  {
    id: 5,
    name: "Brass Plant Stand",
    category: "Decor",
    price: "$249",
    image: "/mid-century-modern-brass-plant-stand.jpg",
    description: "Vintage-inspired brass plant stand with three tiers.",
  },
  {
    id: 6,
    name: "Linen Sofa",
    category: "Furniture",
    price: "$1,299",
    image: "/luxury-linen-sofa-modern-living-room.jpg",
    description: "Comfortable and durable natural linen construction.",
  },
  {
    id: 7,
    name: "Geometric Rug",
    category: "Decor",
    price: "$549",
    image: "/geometric-patterned-area-rug-modern.jpg",
    description: "Hand-woven geometric pattern in neutral colors.",
  },
  {
    id: 8,
    name: "Glass Pendant Lights",
    category: "Lighting",
    price: "$389",
    image: "/designer-glass-pendant-lights-fixture.jpg",
    description: "Set of three handblown glass pendant lights.",
  },
]

const CATEGORIES = ["All", "Furniture", "Lighting", "Decor", "Art"]

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductGrid
        products={filteredProducts}
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onProductSelect={setSelectedProduct}
      />
      {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}
