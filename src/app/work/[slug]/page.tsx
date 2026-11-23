import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AuditBanner, PageIntro, ProjectArt } from "@/components";
import { projects } from "@/lib/content";
import "./page.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return { title: project?.title, description: project?.text };
}

export default async function Project({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();

  return <><PageIntro label={`${project.type.toUpperCase()} · MANAGEMENT AREA`} title={project.title} text={project.text} /><section className="shell section compact project-detail"><ProjectArt project={project} /><Link href="/work" className="text-link"><ArrowLeft size={17} /> Management scope</Link></section><AuditBanner /></>;
}
