import Image from "next/image";

const featuredProjects = [
  {
    title: "Scaling a Design System for Nexa Labs",
    meta: "PRODUCT, UX/UI",
    summary:
      "A healthcare platform connecting Canadian patients with healthcare providers through AI-assisted consultations.",
    image:
      "https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=1300&q=80",
  },
  {
    title: "Optimizing Meta Glasses for Retail",
    meta: "CONCEPTUAL, UX/UI",
    summary:
      "A retail concept focused on ambient assistance and spatial interactions to improve in-store experiences.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1300&q=80",
  },
  {
    title: "Still",
    meta: "HEALTH TECH",
    summary:
      "An Apple Watch and iPhone companion app that detects subtle physiological changes in real-time.",
    image:
      "https://images.unsplash.com/photo-1600959907703-125ba1374a12?auto=format&fit=crop&w=1300&q=80",
  },
  {
    title: "Mitchie Matcha",
    meta: "BRANDING, MENU DESIGN",
    summary:
      "A visual identity system for a Vancouver-based cafe serving handcrafted drinks with premium matcha.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1300&q=80",
  },
];

type CaseStudyCardProps = {
  title: string;
  meta: string;
  summary: string;
  image: string;
};

function CaseStudyCard({ title, meta, summary, image }: CaseStudyCardProps) {
  return (
    <article className="col-span-1 flex h-full flex-col items-start gap-[var(--space-7)] md:col-span-7">
      <div className="w-full overflow-hidden rounded-[var(--radius-2)] border border-black/10 bg-white md:w-[593px]">
        <Image
          src={image}
          alt={title}
          width={593}
          height={330}
          className="h-[220px] w-full object-cover md:h-[330px] md:w-[593px]"
        />
      </div>

      <div className="flex grow flex-col">
        <div className="mb-[var(--space-2)] flex items-start justify-between gap-[var(--space-2)]">
          <h3 className="text-h3-medium text-[var(--color-text-black-light)]">
            {title}
          </h3>
          <p className="text-label-12 font-geist-mono pt-[6px] tracking-[0.16em] text-[var(--muted)]">
            {meta}
          </p>
        </div>
        <p className="text-body-16 max-w-[92%] text-[#746E6E]">{summary}</p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="w-full pb-[var(--space-12)] pt-[var(--space-5)]">
      <div className="grid grid-cols-1 gap-x-[26px] px-[var(--space-5)] md:[grid-template-columns:repeat(14,minmax(0,1fr))] md:px-[47px]">
        <nav className="col-span-1 mb-[116px] flex items-center justify-between md:col-span-14">
          <p className="text-label-12 font-geist-mono rounded-[var(--radius-1)] bg-[var(--accent)]/65 px-[var(--space-1)] py-[var(--space-0)] tracking-[0.12em] text-black">
            rose
          </p>
          <div className="font-geist-mono flex gap-[40px] text-[14px] font-normal leading-[141%] uppercase">
            <a
              href="#work"
              aria-current="page"
              className="nav-link nav-link-active"
            >
              [WORK]
            </a>
            <a
              href="#playground"
              className="nav-link"
            >
              [PLAYGROUND]
            </a>
            <a
              href="#about"
              className="nav-link"
            >
              [ABOUT]
            </a>
            <a
              href="#resume"
              className="nav-link"
            >
              [RESUME]
            </a>
          </div>
        </nav>

        <section className="col-span-1 mb-[76px] text-center md:col-span-14">
          <p className="hero-title text-[var(--color-text-black-light)]">
            Hi, I&apos;m Rose.
          </p>
          <p className="text-label-16 font-geist-mono mx-auto mt-[22px] max-w-xl text-[var(--colours-text-gray-light,#746E6E)]">
            I design products for good and create with intention.
          </p>
        </section>

        <section id="work" className="col-span-1 mb-[var(--space-12)] md:col-span-14">
          <div className="grid grid-cols-1 gap-x-[26px] gap-y-[64px] md:[grid-template-columns:repeat(14,minmax(0,1fr))]">
            {featuredProjects.map((project) => (
              <CaseStudyCard
                key={project.title}
                title={project.title}
                meta={project.meta}
                summary={project.summary}
                image={project.image}
              />
            ))}
          </div>
        </section>

        <footer className="col-span-1 mt-[var(--space-9)] border-t border-[var(--line)] pt-[var(--space-8)] md:col-span-14">
          <div className="w-fit border-t border-[var(--line)] pt-[var(--space-3)]">
            <p className="text-label-12 font-geist-mono mb-[var(--space-1)] tracking-[0.16em] text-[var(--muted)]">
              Let&apos;s create
            </p>
            <div className="text-label-12 font-geist-mono space-y-1 tracking-[0.16em]">
              <p>[ Email ]</p>
              <p>[ LinkedIn ]</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
