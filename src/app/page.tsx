import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <div className="relative isolate overflow-hidden">
        {/* Soft grayish wash from top-left → deep black (header atmosphere) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(100vh,920px)]"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[#050505]" />
          <div className="absolute -left-[20%] -top-[30%] h-[85%] w-[90%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(120,120,120,0.38)_0%,rgba(70,70,70,0.18)_35%,transparent_68%)] blur-2xl" />
          <div className="absolute left-0 top-0 h-[55%] w-[55%] bg-[radial-gradient(ellipse_at_top_left,rgba(160,160,160,0.22)_0%,transparent_55%)]" />
          <div
            className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "180px 180px",
            }}
          />
        </div>
        <Nav />
        <main className="flex-1">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
      </div>
      <Footer />
    </>
  );
}
