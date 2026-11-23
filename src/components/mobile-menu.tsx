"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const nav = [
  { href: "/services", title: "Services" },
  { href: "/portfolio", title: "Portfolio" },
  { href: "/about", title: "About" },
  { href: "/careers", title: "Careers" },
  { href: "/contact", title: "Contact" },
];

export function MobileMenu() {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Close the native <details> when the route changes.
  // This writes to the DOM (external system), not React state.
  useEffect(() => {
    const el = detailsRef.current;
    if (el) el.open = false;
  }, [pathname]);

  // Close on Escape or outside click. Imperative DOM writes only.
  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && el.open) el.open = false;
    };
    const onClick = (e: MouseEvent) => {
      if (el.open && !el.contains(e.target as Node)) el.open = false;
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <details ref={detailsRef} className="mobile-menu group">
      <summary>
        <Menu size={21} className="group-open:hidden" />
        <X size={21} className="hidden group-open:block" />
        <span className="group-open:hidden">Explore</span>
        <span className="hidden group-open:inline">Close</span>
      </summary>
      <div>
        <p>Navigation</p>
        {nav.map((item, index) => (
          <Link key={item.href} href={item.href}>
            <span>0{index + 1}</span>{item.title}
          </Link>
        ))}
        <Link href="/contact" className="mobile-menu-cta">
          Request account review <ArrowUpRight size={16} />
        </Link>
      </div>
    </details>
  );
}