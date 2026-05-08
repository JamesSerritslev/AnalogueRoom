"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/host-event", label: "Host Your Event" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 px-6 md:px-12 py-4 flex items-center justify-between bg-cream/92 backdrop-blur-md border-b border-coal/8">
      <Link href="/" className="flex items-center z-50">
        <Image
          src="/images/ar-logo.png"
          alt="The Analogue Room"
          width={60}
          height={60}
          className="h-[60px] w-auto"
        />
      </Link>
      
      <ul className="flex gap-4 md:gap-6 items-center flex-wrap justify-end">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`font-label text-[11px] tracking-[0.3em] uppercase transition-colors duration-200 ${
                pathname === link.href
                  ? "text-orange border-b border-orange pb-0.5"
                  : "text-coal hover:text-orange"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <a
            href="https://www.standingsunwines.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[11px] tracking-[0.3em] uppercase text-spanish-dk border-b border-spanish-dk/40 pb-0.5 hover:text-orange transition-colors"
          >
            Standing Sun Wines
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/analogueroomsyv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-[11px] tracking-[0.25em] uppercase bg-orange text-cream px-5 py-2.5 hover:bg-spanish transition-colors"
          >
            Instagram
          </a>
        </li>
      </ul>
    </nav>
  )
}
