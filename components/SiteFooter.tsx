import Link from "next/link";
import { navigation, profile } from "@/content/profile";
import { ArrowUpRightIcon } from "@/components/Icons";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.kicker}>KRISTER LLOYD MAGALSO</p>
          <p className={styles.statement}>
            Practical software. Visible evidence. Honest limitations.
          </p>
          <p className={styles.location}>{profile.location}</p>
        </div>
        <nav aria-label="Footer navigation" className={styles.nav}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={styles.external}>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRightIcon />
          </a>
          <a
            href="https://github.com/kristerlloyd23-netizen/SariSariPOS"
            target="_blank"
            rel="noreferrer"
          >
            SariSariPOS source <ArrowUpRightIcon />
          </a>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} Krister Lloyd Magalso</span>
        <span>Designed and built with Next.js · No fabricated metrics</span>
      </div>
    </footer>
  );
}
