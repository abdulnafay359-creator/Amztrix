import Link from "next/link";
import { AuditBanner } from "@/components";
import "./page.css";

export const metadata = { title: "How We Work", description: "The AMZTRIX operating process from account review through ongoing management." };

const stages = [
  { label:"Account context", title:"Read", text:"Review the account surface, current responsibilities, constraints, open risks, and the decisions already in motion.", outputs:["Current-state account map","Known risks and dependencies","Information still required"] },
  { label:"Scope and control", title:"Define", text:"Agree what AMZTRIX manages, what remains with the client, how access works, and how material decisions are approved.", outputs:["Responsibility boundary","Permission plan","Priority and escalation rules"] },
  { label:"Operating rhythm", title:"Run", text:"Execute the agreed work across the relevant Seller Central workstreams and keep the action trail visible.", outputs:["Working priority queue","Documented account changes","Case and dependency follow-up"] },
  { label:"Review and direction", title:"Report", text:"Translate activity into a concise operating picture: what changed, what is blocked, what the signals mean, and what comes next.", outputs:["Completed-work record","Risk and decision summary","Next operating plan"] },
];

export default function Process(){return <div className="process-page">
  <section className="process-hero"><span>How we work</span><h1>Access follows clarity.<br/>Work follows a plan.</h1><p>The process is designed to make account responsibility visible before, during, and after execution.</p><a href="#stages">Enter the operating sequence</a></section>
  <section className="process-stages" id="stages"><header><span>Operating sequence</span><h2>Four stages. A continuous record.</h2></header><div>{stages.map((stage,index)=><article key={stage.title}><div><span>{stage.label}</span><strong>0{index+1}</strong></div><h3>{stage.title}</h3><p>{stage.text}</p><ul>{stage.outputs.map(output=><li key={output}>{output}</li>)}</ul></article>)}</div></section>
  <section className="process-responsibility"><div><span>Responsibility design</span><h2>Every action needs an owner and a boundary.</h2></div><div className="process-matrix"><div><span>AMZTRIX</span><p>Executes the agreed operational scope, documents material changes, follows dependencies, and reports account signals.</p></div><div><span>Client</span><p>Retains account ownership, financial authority, brand approvals, source information, and final control over material decisions.</p></div><div><span>Amazon</span><p>Controls platform policies, catalog acceptance, enforcement decisions, support outcomes, marketplace conditions, and system availability.</p></div></div></section>
  <section className="process-fit"><p>A useful engagement begins when the responsibility can be stated plainly.</p><div><Link href="/services">Explore service scopes</Link><Link href="/contact">Discuss your account</Link></div></section>
  <AuditBanner/>
</div>}
