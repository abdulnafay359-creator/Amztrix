export function PageIntro({label,title,text}:{label:string;title:string;text:string}) {
  return <section className="v3-page-intro"><div className="v3-page-meta"><span>{label}</span><span>Amazon operations / AMZTRIX</span></div><h1>{title}</h1><p>{text}</p></section>;
}
