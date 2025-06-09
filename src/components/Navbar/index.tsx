'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/context/AuthContext'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import LogoutButton from '../Button/LogoutButton'

export default function Navbar() {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const authLinks = !loading && user ? (
    <>
      {user.role === 'ORGANIZER' && (
        <Link href="/dashboard" className="text-white hover:text-yellow-400">
          Dashboard
        </Link>
      )}
      {user.role === 'CUSTOMER' && (
        <Link href="/wallet" className="text-white hover:text-yellow-400">
          Wallet
        </Link>
      )}
      <LogoutButton />
    </>
  ) : (
    <>
      <Link href="/create-event" className="text-white hover:text-yellow-400">
        Create Event
      </Link>
      <Link href="/login" className="text-white hover:text-yellow-400">
        Login
      </Link>
      <Link href="/register">
        <Button className="bg-yellow-400 text-black hover:bg-yellow-300">
          Sign Up
        </Button>
      </Link>
    </>
  )

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset'
  }, [isMenuOpen])

  return (
    <nav className="bg-[#1f1b2e] text-white w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/img/logo-ticket.png" alt="logo" className="h-8 w-8" />
          <span className="text-yellow-400 font-bold text-2xl">Eventify</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`hover:text-yellow-400 relative pb-1 ${
                pathname === href ? 'text-yellow-400 font-semibold border-b-2 border-yellow-400' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-6">{authLinks}</div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#1f1b2e] px-6 pb-4 flex flex-col space-y-4">
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setIsMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 space-y-3">{authLinks}</div>
        </div>
      )}
    </nav>
  )
}
