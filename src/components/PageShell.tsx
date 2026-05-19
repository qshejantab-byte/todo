import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display:"flex", minHeight:"100vh", flexDirection:"column", background:"#0d0f1a" }}>
      <SiteHeader />
      <main style={{ flex:1, paddingTop:"78px" }}>{children}</main>
      <SiteFooter />
    </div>
  );
}
