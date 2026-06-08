"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/demo", label: "데모" },
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(242,241,237,0.84)] backdrop-blur">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1180px] items-center justify-between px-5 sm:px-6">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-[var(--radius-sm)]">
          <span
            className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] bg-[var(--green-800)] font-serif text-xl font-bold text-[var(--canvas)]"
            aria-hidden="true"
          >
            E
          </span>
          <span className="leading-tight">
            <span className="block font-semibold text-[var(--ink)]">ESG 교육 실습</span>
            <span className="block text-xs text-[var(--ink-mid)]">Soilab Cooperative</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--ink-mid)] transition hover:bg-[var(--surface-2)] hover:text-[var(--ink)]",
                pathname === item.href && "bg-[var(--surface-2)] text-[var(--ink)]",
              )}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/demo" size="sm" className="ml-2">
            직접 해보기
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="focus-ring grid min-h-11 min-w-11 place-items-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--canvas)] px-5 py-4 md:hidden">
          <nav className="mx-auto grid max-w-[1180px] gap-2" aria-label="모바일 메뉴">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-[var(--radius-sm)] px-3 py-3 font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/demo" onClick={() => setOpen(false)} className="mt-2">
              직접 해보기
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </nav>
        </div>
      )}
    </header>
  );
}
