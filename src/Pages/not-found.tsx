import { Helmet } from "react-helmet-async";
import { PageShell } from "@/components/PageShell";
import { PageHero, Cta } from "@/components/site/ui";

export default function NotFound() {
  return (
    <PageShell>
      <Helmet>
        <title>Page not found | TODO Growth</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageHero
        eyebrow="404"
        title="This page doesn't exist."
        accent="Let's get you back on track."
        intro="The link may be outdated, or the page may have moved."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Cta to="/">Back to home</Cta>
          <Cta to="/services" variant="secondary">
            View Services
          </Cta>
        </div>
      </PageHero>
    </PageShell>
  );
}
