import { AuditBanner, PageIntro, WorkGrid } from "@/components";
import "./page.css";

export const metadata = { title: "Management Scope" };

export default function Work() {
  return <div className="work-page"><PageIntro label="Management system" title="The moving parts, managed together." text="A closer view of the operating system connecting day-to-day Seller Central work with healthier decisions." />
  <section className="work-system"><header><span>The management layer</span><h2>One weekly picture, built from different kinds of work.</h2></header><div className="work-system-board"><div><span>Observe</span><h3>Signals</h3><p>Sales movement, spend, stock position, notifications, catalog changes, and open cases.</p></div><div><span>Decide</span><h3>Priorities</h3><p>What needs action now, what needs approval, and what should be monitored rather than changed.</p></div><div><span>Execute</span><h3>Workstreams</h3><p>Controlled changes across ads, listings, inventory, support, promotions, and account protection.</p></div><div><span>Record</span><h3>Continuity</h3><p>Completed work, unresolved dependencies, decisions made, and the next operating window.</p></div></div></section>
  <section className="work-views"><div className="work-views-intro"><span>Explore the system</span><h2>Three views into recurring management.</h2><p>These are not separate products. They are different lenses on the same account-management responsibility.</p></div><WorkGrid basePath="/work" /></section>
  <section className="work-cadence"><div><span>Daily</span><p>Monitor material changes, urgent notices, budget pressure, and operational blockers.</p></div><div><span>Weekly</span><p>Review priorities, completed actions, performance signals, inventory exposure, and open dependencies.</p></div><div><span>Monthly</span><p>Step back from task activity to assess commercial direction, operating quality, and the next focus.</p></div></section><AuditBanner /></div>;
}
