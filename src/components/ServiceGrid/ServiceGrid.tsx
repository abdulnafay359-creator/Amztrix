import Link from "next/link";
import { services } from "@/lib/content";

export function ServiceGrid() {
  return <div className="v3-service-list">{services.map(service=><Link key={service.slug} href={`/services/${service.slug}`}><div><h3>{service.title}</h3><p>{service.text}</p></div><span className="v3-service-action">View service <i aria-hidden="true">↗</i></span></Link>)}</div>;
}
