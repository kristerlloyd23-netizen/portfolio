"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container section">
      <p>Something went wrong while rendering this page.</p>
      <h1>Let’s try that again.</h1>
      <div className="buttonRow">
        <button type="button" className="button buttonPrimary" onClick={reset}>
          Try again
        </button>
        <Link href="/" className="button buttonSecondary">
          Return home
        </Link>
      </div>
    </div>
  );
}
