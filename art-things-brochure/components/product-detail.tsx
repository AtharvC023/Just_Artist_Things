"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, MessageCircle, Instagram } from "lucide-react"

const WHATSAPP_NUMBER = "918830968893" // Replace with your WhatsApp number (with country code, no + or spaces)
const INSTAGRAM_USERNAME = "justartistthings" // Replace with your Instagram username

export default function ProductDetail({ product, onClose }) {
  if (!product) return null

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(`Hi! I'm interested in: ${product.name}\n\nCould you provide more details?`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  const handleInstagramInquiry = () => {
    window.open(`https://ig.me/m/${INSTAGRAM_USERNAME}`, '_blank')
  }

  return (
    <AnimatePresence>
      <Sheet open={true} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl font-serif">{product.name}</SheetTitle>
            <SheetClose />
          </SheetHeader>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="py-6 space-y-6"
          >
            <div className="rounded-lg overflow-hidden bg-secondary h-64">
              <img
                src={product.image || "/placeholder.svg?height=256&width=400&query=product"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{product.category}</p>
              </div>

              <div>
                <h4 className="font-serif font-bold mb-2 text-foreground">About this Product</h4>
                <p className="text-foreground/70 leading-relaxed">{product.description}</p>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-border">
              <Button 
                onClick={handleWhatsAppInquiry}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white" 
                size="lg"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Inquire on WhatsApp
              </Button>
              <Button
                onClick={handleInstagramInquiry}
                variant="outline"
                className="w-full border-[#E4405F] text-[#E4405F] hover:bg-[#E4405F] hover:text-white"
                size="lg"
              >
                <Instagram className="mr-2 h-4 w-4" />
                Inquire on Instagram
              </Button>
            </div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </AnimatePresence>
  )
}
