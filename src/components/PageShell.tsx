import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        background: "#0b0d17",
      }}
    >
      <SiteHeader />
      <main id="main" tabIndex={-1} style={{ flex: 1, paddingTop: "76px", outline: "none" }}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
