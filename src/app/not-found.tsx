import Link from "next/link";
import { PageIntro } from "@/components";
import "./not-found.css";

export default function NotFound() {
  return <><PageIntro label="404" title="Page not found." text="The page you requested may have moved." /><div className="shell section compact"><Link className="button" href="/">Back to Home</Link></div></>;
}
