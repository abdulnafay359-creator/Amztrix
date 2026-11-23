import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return <Link href="/" className="v3-brand" aria-label="AMZTRIX home"><Image src="/brand/amztrix-logo-dark.png" alt="AMZTRIX — Beyond listings. Building brands." width={892} height={181} priority /></Link>;
}
