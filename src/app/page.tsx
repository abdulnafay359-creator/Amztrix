import Link from "next/link";
import { AuditBanner, ServiceGrid, WorkGrid } from "@/components";
import { process } from "@/lib/content";
import "./page.css";

export default function Home(){return <>
  <section className="v3-hero"><div className="v3-hero-kicker"><span>Amazon account operations</span><span>Strategy is only useful when the account moves.</span></div><div className="v3-hero-copy"><h1>We operate the account behind the brand.</h1><p>AMZTRIX manages the recurring Seller Central work connecting advertising, catalog, inventory, cases, and account health.</p><div><Link href="/contact">Discuss your account</Link><Link href="/services">Explore the operating scope</Link></div></div><div className="v3-hero-status"><span>Account ownership stays with the client</span><span>Access is limited to the agreed scope</span><span>Decisions remain visible</span></div></section>
  <section className="v3-manifesto"><p>Most Amazon accounts do not need more disconnected advice.</p><h2>They need someone to connect the work, follow the details, and keep the operating picture clear.</h2><div><span>Seller Central</span><span>Amazon Ads</span><span>FBA</span><span>Account Health</span></div></section>
  <section className="v3-section"><div className="v3-section-head"><span>Operating scope</span><h2>Six disciplines.<br/>One accountable workflow.</h2><p>Engage AMZTRIX across the account or around a focused operational need. The responsibilities and access level are defined before work begins.</p></div><ServiceGrid/></section>
  <section className="v3-section v3-work-section"><div className="v3-section-head"><span>Inside the work</span><h2>What management looks like when it is organized.</h2><p>Illustrative operating views—not invented client results. Each example shows how recurring work is structured and made visible.</p></div><WorkGrid/></section>
  <section className="v3-method"><div className="v3-method-intro"><span>Working model</span><h2>Clarity before access.<br/>Consistency after it.</h2></div><ol>{process.map(step=><li key={step.title}><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></section>
  <section className="v3-boundary"><div><span>Account stewardship</span><h2>Your account remains yours.</h2></div><p>AMZTRIX works through agreed permissions. The client retains ownership, financial control, brand assets, and final authority over material decisions.</p><ul><li>No password sharing</li><li>No hidden permissions</li><li>No guaranteed performance claims</li></ul></section>
  <AuditBanner/>
  </>}
