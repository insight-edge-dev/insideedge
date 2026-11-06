"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky header: transparent at the top of the page, solid after scrolling,
 * tucks away while scrolling down and returns on scroll up.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        data-track-location="header"
        className={cn(
          "fixed inset-x-0 top-0 z-(--z-header) transition-[transform,background-color,border-color] duration-500 ease-edge",
          scrolled ? "border-b border-line bg-paper/95" : "border-b border-transparent bg-transparent",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="container-site flex h-(--header-h) items-center justify-between gap-6">
          <Logo priority />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative block px-3.5 py-2 text-[0.9375rem] font-medium"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 bottom-1 h-[2px] origin-left bg-edge transition-transform duration-(--duration-base) ease-edge",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ButtonLink href="/free-audit" variant="outline" icon={false}>
              Free Audit
            </ButtonLink>
            <ButtonLink href="/contact" variant="ink">
              Start a Project
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 items-center gap-3 px-2 text-sm font-semibold lg:hidden"
          >
            Menu
            <span aria-hidden className="flex w-6 flex-col gap-[5px]">
              <span className="h-[2px] w-full bg-current" />
              <span className="h-[2px] w-2/3 self-end bg-edge-deep" />
            </span>
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
