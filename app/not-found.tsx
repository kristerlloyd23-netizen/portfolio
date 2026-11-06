import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <div className="container section">
      <p>404 / PAGE NOT FOUND</p>
      <h1>This route doesn’t exist.</h1>
      <p>The page may have moved, or the address may be incorrect.</p>
      <Link href="/" className="button buttonPrimary">
        Return home <ArrowRightIcon />
      </Link>
    </div>
  );
}
