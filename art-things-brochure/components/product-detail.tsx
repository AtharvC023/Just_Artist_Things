"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Mail } from "lucide-react"

export default function ProductDetail({ product, onClose }) {
  if (!product) return null

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
                <p className="text-3xl font-bold text-foreground">{product.price}</p>
              </div>

              <div>
                <h4 className="font-serif font-bold mb-2 text-foreground">About this Product</h4>
                <p className="text-foreground/70 leading-relaxed">{product.description}</p>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-border">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full border-foreground/20 text-foreground hover:bg-foreground/5 bg-transparent"
                size="lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact for Details
              </Button>
            </div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </AnimatePresence>
  )
}
