export function HeroOperationsAnimation() {
  return (
    <div className="hero-exploded" role="img" aria-label="Animated illustration of connected Amazon account operations">
      <div className="hero-exploded-grid" aria-hidden="true" />
      <div className="ops-orbit ops-orbit-ads"><span>ADS</span><b>Bid & search-term review</b></div>
      <div className="ops-orbit ops-orbit-fba"><span>FBA</span><b>Restock coordination</b></div>
      <div className="ops-orbit ops-orbit-health"><span>HEALTH</span><b>Cases & notifications</b></div>
      <div className="ops-wire wire-a"/><div className="ops-wire wire-b"/><div className="ops-wire wire-c"/>
      <div className="ops-stack hero-stack">
        <div className="ops-layer layer-report"><div className="ops-plane ops-report"><span className="ops-chip">REPORTING</span><i/><i/><i/><div className="ops-bars"><b/><b/><b/><b/><b/></div></div></div>
        <div className="ops-layer layer-control"><div className="ops-plane ops-control"><span className="ops-chip">CONTROL</span><div className="ops-dial"/><div className="ops-control-lines"><i/><i/><i/></div></div></div>
        <div className="ops-layer layer-work"><div className="ops-plane ops-work"><span className="ops-chip">OPERATIONS</span><div className="ops-work-grid"><i/><i/><i/><i/></div></div></div>
        <div className="ops-layer layer-data"><div className="ops-plane ops-data"><span className="ops-chip">SELLER CENTRAL</span><div className="ops-data-lines"><i/><i/><i/><i/></div></div></div>
        <div className="ops-layer layer-base"><div className="ops-plane ops-base"><span>ACCOUNT OWNERSHIP</span><b>Client controlled</b></div></div>
        <span className="ops-pin pin-one"/><span className="ops-pin pin-two"/><span className="ops-pin pin-three"/><span className="ops-pin pin-four"/>
      </div>
      <div className="hero-animation-note"><span>LIVE OPERATING VIEW</span><b>Connected account management</b></div>
    </div>
  );
}
