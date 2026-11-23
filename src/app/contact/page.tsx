import Link from "next/link";
import { ArrowDownRight, Check, Mail, ShieldCheck } from "lucide-react";
import { AuditForm } from "./audit-form";
import "./page.css";

export const metadata = { title: "Contact" };

export default function Contact(){return <div className="contact-premium" data-astra-story>
  <section className="contact-hero">
    <div className="contact-hero-copy"><p className="eyebrow">Start a conversation</p><h1>Bring us the account as it is.</h1><p>Tell us what is happening inside your Amazon operation—what feels unclear, what is consuming time, and what needs attention first.</p><a href="#enquiry">Share your account brief <ArrowDownRight size={17}/></a></div>
    <aside className="contact-hero-aside"><div><span>Currently discussing</span><p>Full account management</p><p>Advertising control</p><p>Catalog and operational support</p></div><div><span>Direct email</span><a href="mailto:hello@amztrix.com"><Mail size={15}/>hello@amztrix.com</a></div></aside>
  </section>
  <section className="contact-workspace" id="enquiry">
    <div className="contact-workspace-copy"><p className="eyebrow">Account review</p><h2>A useful first conversation starts with context.</h2><p>Send a public storefront or listing link and a short description of the pressure points. We’ll review the request and suggest the most relevant next step.</p><ul><li><Check size={15}/>No password or Seller Central credentials</li><li><Check size={15}/>No obligation to engage</li><li><Check size={15}/>No guaranteed performance claims</li></ul></div>
    <AuditForm/>
  </section>
  <section className="contact-next"><header><span>What happens next</span><h2>Simple, direct, and scoped before access.</h2></header><div className="contact-next-grid"><article><ShieldCheck size={19}/><h3>We review the context</h3><p>We look at the public account surface and the operational needs you describe.</p></article><article><Mail size={19}/><h3>We reply directly</h3><p>If the request fits our work, we arrange a short conversation around priorities and constraints.</p></article><article><Check size={19}/><h3>We define the scope</h3><p>Responsibilities, access, communication, and boundaries are agreed before work begins.</p></article></div><Link href="/services">Explore managed services <ArrowDownRight size={16}/></Link></section>
</div>}
