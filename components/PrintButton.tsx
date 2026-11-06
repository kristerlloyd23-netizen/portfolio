"use client";

import { PrintIcon } from "@/components/PrintIcon";

export function PrintButton() {
  return (
    <button type="button" className="button buttonSecondary" onClick={() => window.print()}>
      <PrintIcon /> Print / save a copy
    </button>
  );
}
