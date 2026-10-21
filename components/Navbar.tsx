"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/",          label: "Home",         id: "home" },
  { href: "/#features", label: "Features",     id: "features" },
  { href: "/#how",      label: "How It Works", id: "how" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const [renderedPath, setRenderedPath] = useState(pathname);

  /*
   * Adjusting state during render, rather than in an effect, is React's
   * documented pattern for "reset when a value changes" — it re-renders
   * before the browser paints, so neither the stale active link nor an open
   * menu is ever shown on the new route.
   */
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setMenuOpen(false);
    if (pathname !== "/") setActiveSection("about");
  }

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const observerOptions = { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 };
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
        ${scrolled 
          ? "bg-white/92 backdrop-blur-xl border-b border-slate-900/5 shadow-sm" 
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <div
        className={`mx-auto flex items-center justify-between px-6 transition-all duration-400
          max-w-[1900px] min-[2500px]:max-w-[2400px]
          ${scrolled ? "py-3 min-[2500px]:py-6" : "py-5 min-[2500px]:py-10"}
        `}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 min-[2500px]:gap-6 group">
          <div className="w-10 h-10 min-[2500px]:w-20 min-[2500px]:h-20 rounded-xl min-[2500px]:rounded-3xl bg-white border border-teal-600/30 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-sm">
            <Image src="/logo.png" alt="4 Our Life" width={26} height={26} className="object-cover w-full min-[2500px]:p-2" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-figtree font-black text-slate-900 tracking-tight text-[1.05rem] min-[2500px]:text-4xl">
              4 Our Life
            </span>
            <span className="font-noto font-bold text-teal-600 uppercase tracking-widest mt-0.5 text-[0.6rem] min-[2500px]:text-lg min-[2500px]:mt-2">
              Ghana Health
            </span>
          </div>
        </Link>

        {/* Desktop Nav - Scaled for Ultra-Wide */}
        <nav className="hidden lg:flex items-center gap-1 min-[2500px]:gap-4">
          {NAV_LINKS.map((link) => {
            const isHomePage = pathname === "/";
            const isActive = isHomePage ? activeSection === link.id : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-noto font-bold text-sm min-[2500px]:text-2xl px-4.5 py-2 rounded-xl transition-all duration-250
                  ${isActive 
                    ? "text-teal-600 bg-teal-50" 
                    : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 min-[2500px]:gap-8">
          <Link
            href="#download"
            className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-teal-600 text-white font-figtree font-extrabold text-[0.875rem] min-[2500px]:text-2xl px-6 py-2.5 min-[2500px]:px-12 min-[2500px]:py-6 rounded-full transition-all duration-300 active:scale-95 shadow-sm"
          >
            <Smartphone className="w-3.5 h-3.5 min-[2500px]:w-8 min-[2500px]:h-8" />
            Get the App
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300
              ${menuOpen ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-900"}
            `}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[-1] bg-slate-900/20 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-4 right-4 mt-3 rounded-3xl p-6 bg-white border border-slate-100 shadow-2xl lg:hidden"
            >
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block font-figtree font-extrabold text-lg p-3 rounded-xl
                      ${(pathname === "/" ? activeSection === link.id : pathname === link.href) 
                        ? "text-teal-600 bg-teal-50" 
                        : "text-slate-900"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-50">
                <Link
                  href="#download"
                  className="flex items-center justify-center w-full py-4 rounded-2xl bg-teal-600 text-white font-figtree font-extrabold"
                  onClick={() => setMenuOpen(false)}
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Download Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}