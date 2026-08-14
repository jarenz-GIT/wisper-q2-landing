import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import OurProcess from "@/components/OurProcess";
import PackageChoices from "@/components/PackageChoices";

export const metadata = {
  title: "Services | Wisper Studios",
  description: "Services — Wisper Studios.",
};

export default function ServicesPage() {
  return (
    <>
      <PackageChoices />
      <OurProcess />
      <CTA />
      <Footer />
    </>
  );
}
