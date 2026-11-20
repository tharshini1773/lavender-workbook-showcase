import { createFileRoute } from "@tanstack/react-router";
import { CertificatesSection } from "@/components/certificates-section";
import { PageIntro } from "@/components/portfolio-shell";
import { pageHead } from "@/lib/portfolio";

export const Route = createFileRoute("/certificates")({
  head: () => pageHead("My Certificates", "Explore technical certifications, courses and verified achievements earned by Tharshini J."),
  component: CertificatesPage,
});

function CertificatesPage() {
  return (
    <>
      <PageIntro label="Recognitions & Learning" title="My Certificates." />
      <CertificatesSection />
    </>
  );
}
