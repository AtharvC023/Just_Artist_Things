"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Moon, Sun, LogIn, LogOut, User } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, signInWithGoogle, signOut } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Just Artist Things" className="h-8 w-8" />
          <span className="text-2xl font-serif font-bold tracking-tight text-foreground">Just Artist Things</span>
        </div>

        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-foreground hover:text-foreground/60 transition-colors cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                  <AvatarFallback><User size={16} /></AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{user.displayName}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="hidden md:flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              onClick={signInWithGoogle}
              className="hidden md:flex items-center gap-2"
            >
              <LogIn size={16} />
              Sign in with Google
            </Button>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-foreground"
          >
            {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
          </Button>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-card border-t border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                {item.name}
              </a>
            ))}
            {user ? (
              <>
                <div className="flex items-center gap-3 py-2 border-t border-border">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback><User size={16} /></AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">{user.displayName}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="w-full"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={signInWithGoogle}
                className="w-full"
              >
                <LogIn size={16} className="mr-2" />
                Sign in with Google
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
