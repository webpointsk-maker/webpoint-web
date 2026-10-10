import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Fit } from "@/components/Fit";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Results } from "@/components/Results";
import { Reviews } from "@/components/Reviews";
import { System } from "@/components/System";
import { Tape } from "@/components/Tape";
import { Process } from "@/components/Process";
import { WhyUs } from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tape />
        <Reviews />
        <Problem />
        <System />
        <WhyUs />
        <Results />
        <Tape variant="dark" words={["Viac dopytov", "Plné kalendáre", "Reálne čísla", "Menej starostí", "Viac zákazníkov"]} />
        <Fit />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
