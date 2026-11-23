import Link from "next/link";
import { projects } from "@/lib/content";
import { ProjectArt } from "./ProjectArt";

export function WorkGrid({basePath="/portfolio"}:{basePath?:string}) {
  return <div className="v3-work-list">{projects.map(project=><Link href={`${basePath}/${project.slug}`} key={project.slug}><ProjectArt project={project}/><div className="v3-work-copy"><span>{project.type}</span><h3>{project.title}</h3><p>{project.text}</p></div></Link>)}</div>;
}
