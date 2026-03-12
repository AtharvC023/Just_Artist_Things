"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { cart, getTotalAmount } = useCart()

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("simulated")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!user) {
      router.push('/home')
      return
    }
    if (!cart || cart.items.length === 0) {
      router.push('/cart')
      return
    }
  }, [user, cart, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Enter valid 10-digit phone number"
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required"
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Enter valid 6-digit pincode"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly")
      return
    }

    // Store checkout data in sessionStorage
    sessionStorage.setItem('checkoutData', JSON.stringify({
      shippingAddress: formData,
      paymentMethod,
      items: cart?.items,
      totalAmount: getTotalAmount()
    }))

    // Navigate to payment page
    router.push('/payment')
  }

  if (!user || !cart || cart.items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 dark:from-slate-900 dark:via-cyan-950/30 dark:to-slate-800">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => router.push('/cart')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-serif font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="addressLine1">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleInputChange}
                        placeholder="House No., Building Name"
                        className={errors.addressLine1 ? "border-red-500" : ""}
                      />
                      {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>}
                    </div>

                    <div>
                      <Label htmlFor="addressLine2">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Road Name, Area, Colony"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={errors.city ? "border-red-500" : ""}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={errors.state ? "border-red-500" : ""}
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                        className={errors.pincode ? "border-red-500" : ""}
                      />
                      {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </Card>

                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg mb-3 cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="simulated" id="simulated" />
                      <Label htmlFor="simulated" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Simulated Online Payment</p>
                          <p className="text-sm text-muted-foreground">Instant payment simulation (for demo)</p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5" />
                        <div>
                          <p className="font-medium">UPI QR Payment</p>
                          <p className="text-sm text-muted-foreground">Scan QR code and pay manually</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </Card>

                <Button type="submit" size="lg" className="w-full">
                  Continue to Payment
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{getTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{getTotalAmount().toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
