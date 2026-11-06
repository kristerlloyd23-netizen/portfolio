"use client";

import { MoonIcon, SunIcon } from "@/components/Icons";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  function toggleTheme() {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("klm-theme", next);
    } catch {
      // The visual theme still works when storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label="Switch color theme"
    >
      <span className={styles.sun}>
        <SunIcon />
      </span>
      <span className={styles.moon}>
        <MoonIcon />
      </span>
    </button>
  );
}
