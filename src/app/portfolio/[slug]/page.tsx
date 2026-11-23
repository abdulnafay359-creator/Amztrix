import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AuditBanner, PageIntro, ProjectArt } from "@/components";
import { projects } from "@/lib/content";
import "./page.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return { title: project?.title, description: project?.text };
}

export default async function PortfolioDetail({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <><PageIntro label={`${project.type.toUpperCase()} · OPERATING EXAMPLE`} title={project.title} text={project.text} /><section className="shell section compact project-detail"><div className="example-disclosure"><strong>Illustrative process view</strong><span>This is not presented as a client case study or performance result.</span></div><ProjectArt project={project} /><Link href="/portfolio" className="text-link"><ArrowLeft size={17} /> All operating examples</Link></section><AuditBanner /></>;
}
