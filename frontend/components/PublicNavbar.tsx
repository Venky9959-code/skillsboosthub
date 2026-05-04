"use client";

import Link from "next/link";

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Skills<span className="text-black">BoostHub</span>
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="#courses">Courses</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#about">About</Link>
          <Link href="#resources">Resources</Link>
          <Link href="#contact">Contact / Enquiry</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium">
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
