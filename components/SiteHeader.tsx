"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/content/profile";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const open = menu.path === pathname && menu.open;

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu({ open: false, path: pathname });
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, pathname]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Krister Lloyd Magalso — home">
          <span className={styles.brandMark}>KLM</span>
          <span className={styles.brandText}>Engineering portfolio</span>
        </Link>
        <div className={styles.actions}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setMenu({ open: !open, path: pathname })}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? styles.active : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setMenu({ open: false, path: pathname })}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
