import Link from "next/link";
import { Brand } from "@/components/Brand/Brand";
import { navigation } from "@/components/navigation";

export function SiteHeader() {
  return (
    <header className="v3-header">
      <div className="v3-nav">
        <div className="v3-brand-lockup">
          <Brand />
          <span>Amazon<br />operations</span>
        </div>

        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.title}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="v3-nav-cta">
          <span>Start a project</span>
          <i aria-hidden="true">↗</i>
        </Link>

        <details className="v3-menu">
          <summary>
            <span>Open navigation</span>
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </summary>

          <div className="v3-menu-panel">
            <div className="v3-menu-head">
              <Brand />
              <span>Independent Amazon<br />operations studio</span>
            </div>

            <nav aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link href={item.href} key={item.href}>
                  <strong>{item.title}</strong>
                  <i aria-hidden="true">↗</i>
                </Link>
              ))}
            </nav>

            <div className="v3-menu-foot">
              <span>Karachi · Working globally</span>
              <Link href="/contact">Tell us about the account</Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}