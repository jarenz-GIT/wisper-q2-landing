import HomePage from "@/app/page";
import TypeformAutoOpen from "@/components/TypeformAutoOpen/TypeformAutoOpen";

export const metadata = {
  title: "Contact | Wisper Studios",
  description: "Get in touch — Wisper Studios.",
};

export default function ContactPage() {
  return (
    <>
      <HomePage />
      <TypeformAutoOpen />
    </>
  );
}
