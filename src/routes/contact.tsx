import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/portfolio-sections";
import { PageIntro } from "@/components/portfolio-shell";
import { pageHead } from "@/lib/portfolio";
export const Route = createFileRoute("/contact")({ head: () => pageHead("Contact", "Connect with Tharshini J for internship opportunities and software projects. Find her email, phone number and downloadable resume."), component: ContactPage });
function ContactPage() { 
  return (
    <>
      <PageIntro 
        label="Say hello" 
        title="Let’s connect." 
        subtitle="Reach out for internship opportunities, project collaborations, or technology discussions. Messages are saved to Cloud Firestore."
      />
      <ContactSection />
    </>
  ); 
}