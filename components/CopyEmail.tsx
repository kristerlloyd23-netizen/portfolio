"use client";

import { useState } from "react";
import { contactDetails } from "@/content/contact";
import { CheckIcon, CopyIcon } from "@/components/Icons";
import styles from "./CopyEmail.module.css";

export function CopyEmail() {
  const [status, setStatus] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactDetails.email);
      setStatus("Email address copied.");
    } catch {
      setStatus("Copy was unavailable. Please select the email address instead.");
    }
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" onClick={copyEmail} className={styles.button}>
        {status === "Email address copied." ? <CheckIcon /> : <CopyIcon />}
        Copy email
      </button>
      <span className={styles.status} role="status" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
