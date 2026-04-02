"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "WORK" },
  { href: "/playground", label: "PLAYGROUND" },
  { href: "/about", label: "ABOUT" },
  { href: "/resume", label: "RESUME" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between pb-[var(--space-5)] pt-[var(--space-5)]">
      <Link
        href="/"
        className="text-label-12 font-geist-mono inline-flex items-center justify-center bg-[var(--colours-primary-primary-200)] px-[var(--space-1)] py-[var(--space-0)] tracking-[0.12em] text-[var(--colours-surface-surface-200)]"
      >
        rose
      </Link>
      <div className="font-geist-mono flex gap-[40px] text-[14px] font-normal leading-[141%] uppercase">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive ? "nav-link-active" : ""}`}
            >
              [{link.label}]
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
