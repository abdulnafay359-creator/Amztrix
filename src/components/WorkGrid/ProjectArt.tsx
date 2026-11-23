import { projects } from "@/lib/content";
import { Activity, CircleCheck, MoreHorizontal, PackageCheck, Search, ShieldCheck } from "lucide-react";

export function ProjectArt({project}:{project:(typeof projects)[number]}) {
  if(project.style==="bottle")return <div className="v3-project-visual realistic-console operations-console">
    <div className="console-window">
      <header><div className="console-brand"><PackageCheck size={14}/><span>Operations</span></div><div className="console-search"><Search size={11}/><span>Search account</span></div><MoreHorizontal size={15}/></header>
      <div className="console-kpis"><div><span>Catalog</span><strong>Reviewed</strong><i className="status-ready"/></div><div><span>Inventory</span><strong>In range</strong><i className="status-live"/></div><div><span>Cases</span><strong>In progress</strong><i className="status-warn"/></div></div>
      <div className="console-table"><div className="table-head"><span>Workstream</span><span>Status</span><span>Next action</span></div><div className="table-row"><span><i className="product-thumb gold"/>Listing maintenance</span><b>Ready</b><em>Quality review</em></div><div className="table-row"><span><i className="product-thumb green"/>FBA replenishment</span><b>Active</b><em>Confirm inbound</em></div><div className="table-row"><span><i className="product-thumb red"/>Support case</span><b>Open</b><em>Follow up</em></div></div>
      <footer><span><i/>Account workspace synced</span><small>Illustrative view</small></footer>
    </div>
  </div>;
  if(project.style==="coffee")return <div className="v3-project-visual realistic-console ads-console">
    <div className="console-window">
      <header><div className="console-brand"><Activity size={14}/><span>Advertising</span></div><div className="date-control">Current period</div><MoreHorizontal size={15}/></header>
      <div className="ads-summary"><div><span>Spend control</span><strong>On plan</strong></div><div><span>Search coverage</span><strong>Expanding</strong></div><div><span>Efficiency</span><strong>Monitored</strong></div></div>
      <div className="ads-chart"><div className="chart-label"><span>Campaign signal</span><b>Live review</b></div><svg viewBox="0 0 420 115" role="img" aria-label="Illustrative advertising trend"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d2ad63" stopOpacity=".28"/><stop offset="1" stopColor="#d2ad63" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d="M0 91 C36 82 52 88 82 68 S132 75 168 52 S223 65 256 43 S316 51 350 27 S394 31 420 14 L420 115 L0 115 Z"/><path className="chart-line" d="M0 91 C36 82 52 88 82 68 S132 75 168 52 S223 65 256 43 S316 51 350 27 S394 31 420 14"/></svg></div>
      <div className="campaign-strip"><span><i className="status-live"/>Brand terms</span><span><i className="status-ready"/>Category discovery</span><span><i className="status-warn"/>Product targeting</span></div>
    </div>
  </div>;
  return <div className="v3-project-visual realistic-console health-console">
    <div className="console-window">
      <header><div className="console-brand"><ShieldCheck size={14}/><span>Account health</span></div><div className="health-live"><i/>Monitoring active</div><MoreHorizontal size={15}/></header>
      <div className="health-body"><div className="health-score"><div className="health-gauge"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="49"/><circle className="gauge-progress" cx="60" cy="60" r="49"/></svg><ShieldCheck size={25}/></div><strong>Account monitored</strong><span>No critical signal shown</span></div><div className="health-feed"><div><i className="status-ready"/><span><b>Policy signals</b><small>Review complete</small></span><CircleCheck size={14}/></div><div><i className="status-live"/><span><b>Performance notices</b><small>Continuous watch</small></span><CircleCheck size={14}/></div><div><i className="status-warn"/><span><b>Open cases</b><small>Follow-up scheduled</small></span><Activity size={14}/></div></div></div>
      <footer><span><i/>Last workspace check complete</span><small>Illustrative view</small></footer>
    </div>
  </div>;
}
