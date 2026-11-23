import { Suspense } from "react";
import { AuditBanner, ServiceDetail, ServiceDetailLoading } from "@/components";
import { services } from "@/lib/content";
import "./page.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find(item => item.slug === slug);
  return { title: service?.title, description: service?.text };
}

export default function Service({ params }: Props) {
  return <><Suspense fallback={<ServiceDetailLoading/>}><ServiceDetail params={params}/></Suspense><AuditBanner/></>;
}
