import Link from "next/link";
import { Brand } from "@/components/Brand/Brand";
import { navigation } from "@/components/navigation";

export function SiteFooter() {
  return <footer className="v3-footer"><div className="v3-footer-shell"><div className="v3-footer-pitch"><p>Have an Amazon account that needs a steadier operating rhythm?</p><Link href="/contact"><span>Start a conversation</span><i aria-hidden="true">↗</i></Link></div><div className="v3-footer-directory"><div className="v3-footer-identity"><Brand/><p>Focused account management for brands selling through Amazon.</p></div><nav aria-label="Footer navigation">{navigation.map(item=><Link href={item.href} key={item.href}>{item.title}</Link>)}</nav><div className="v3-footer-capabilities"><span>Core systems</span><p>Seller Central<br/>Amazon Ads<br/>FBA Operations<br/>Account Health</p></div></div><div className="v3-footer-bottom"><span>© 2026 AMZTRIX</span><span>Independent service provider — not affiliated with Amazon.</span><Link href="/privacy">Privacy policy</Link><a href="#main">Back to top ↑</a></div></div></footer>;
}
