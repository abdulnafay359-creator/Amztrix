"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { submitAudit, type AuditState } from "./actions";

const initial: AuditState = { status: "idle", message: "" };

export function AuditForm() {
  const [state, action, pending] = useActionState(submitAudit, initial);
  const [fields, setFields] = useState({ name: "", email: "", listingUrl: "", serviceFocus: "", startingPoint: "", notes: "" });

  if (state.status === "success") {
    return <div className="audit-form confirmation" role="status"><CheckCircle size={30} /><h2>Request received.</h2><p>{state.message}</p><Link href="/work" className="text-link">Explore our work <ArrowUpRight size={17} /></Link></div>;
  }

  return <form className="audit-form" action={action}>
    <h2>Request your review</h2>
    <label>Your name <span>(optional)</span><input name="name" autoComplete="name" maxLength={100} value={fields.name} onChange={e => setFields({ ...fields, name: e.target.value })} /></label>
    <label>Email address<input name="email" type="email" autoComplete="email" maxLength={254} required value={fields.email} onChange={e => setFields({ ...fields, email: e.target.value })} /></label>
    <label>Amazon storefront or listing URL<input name="listingUrl" type="url" maxLength={2048} placeholder="https://www.amazon.com/..." required value={fields.listingUrl} onChange={e => setFields({ ...fields, listingUrl: e.target.value })} /></label>
    <fieldset className="form-choice"><legend>Where should we focus first? <span>(optional)</span></legend><div><label><input type="radio" name="serviceFocus" value="Full account management" checked={fields.serviceFocus === "Full account management"} onChange={e => setFields({ ...fields, serviceFocus: e.target.value })}/><span>Full account</span></label><label><input type="radio" name="serviceFocus" value="Advertising and growth" checked={fields.serviceFocus === "Advertising and growth"} onChange={e => setFields({ ...fields, serviceFocus: e.target.value })}/><span>Advertising</span></label><label><input type="radio" name="serviceFocus" value="Catalog and operations" checked={fields.serviceFocus === "Catalog and operations"} onChange={e => setFields({ ...fields, serviceFocus: e.target.value })}/><span>Catalog / operations</span></label><label><input type="radio" name="serviceFocus" value="Account health" checked={fields.serviceFocus === "Account health"} onChange={e => setFields({ ...fields, serviceFocus: e.target.value })}/><span>Account health</span></label></div></fieldset>
    <label>What best describes the starting point?<select name="startingPoint" value={fields.startingPoint} onChange={e => setFields({ ...fields, startingPoint: e.target.value })}><option value="">Choose the closest fit</option><option>Need ongoing management</option><option>Fixing an existing problem</option><option>Preparing a launch</option><option>Reviewing current performance</option><option>Not sure yet</option></select></label>
    <label>What do you need help managing? <span>(optional)</span><textarea name="notes" rows={4} maxLength={1500} placeholder="PPC, listings, inventory, account health, or full management..." value={fields.notes} onChange={e => setFields({ ...fields, notes: e.target.value })} /></label>
    <div className="form-trap" aria-hidden="true"><label>Website<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
    {state.status === "error" && <p className="form-error" role="alert">{state.message}</p>}
    <button type="submit" className="button" disabled={pending}>{pending ? "Sending…" : "Request Account Review"}<ArrowUpRight size={18} /></button>
    <p className="form-note">We’ll use your email to reply about your request. <Link href="/privacy">Privacy</Link></p>
  </form>;
}
