import Link from "next/link";
import { ArrowLeft, Check, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro/PageIntro";
import { services } from "@/lib/content";

type Params = Promise<{slug:string}>;

export function ServiceDetailLoading(){
  return <div className="service-detail-loading" aria-label="Loading service"><span/><span/><span/></div>;
}

export async function ServiceDetail({params}:{params:Params}){
  const {slug}=await params;
  const service=services.find(item=>item.slug===slug);
  if(!service)notFound();
  return <div className={`service-detail service-detail--${slug}`}>
    <PageIntro label="Amazon services" title={service.title} text={service.text}/>
    <section className="service-overview"><div className="service-overview-label"><p>Operating objective</p></div><div><h2>{service.statement}</h2><p><strong>Best suited for</strong>{service.bestFor}</p></div></section>
    <section className="service-scope"><header><span>Scope</span><h2>What the engagement can include.</h2><p>The final scope is shaped around the account condition, internal resources, priorities, and access available.</p></header><ul>{service.details.map(detail=><li key={detail}><Check size={17}/><p>{detail}</p></li>)}</ul></section>
    <section className="service-workflow"><header><span>Workflow</span><h2>A visible operating sequence.</h2></header><ol>{service.workflow.map(step=><li key={step}><p>{step}</p><ArrowUpRight size={17}/></li>)}</ol></section>
    <section className="service-engagement"><div><span>Working rhythm</span><h2>{service.cadence}</h2></div><div><span>Important boundary</span><p>{service.boundary}</p></div></section>
    <div className="service-return"><Link href="/services"><ArrowLeft size={16}/>Explore all services</Link></div>
  </div>;
}
