import Image from "next/image";
import Nav from "@/components/Nav";

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
      "A healthcare platform connecting Canadian patients with healthcare providers through AI-assisted consultations.",
    image: "/assets/cs-meta-glasses.png",
  },
  {
    title: "Still",
    meta: "FIGMA, HEALTH TECH",
    summary:
      "An Apple Watch and iPhone companion app that detects subtle physiological changes in real-time.",
    image: "/assets/cs-still.png",
  },
  {
    title: "Mitchie Matcha",
    meta: "BRANDING, MENU DESIGN",
    summary:
      "Designing merchandise for a Vancouver-based cafe offering handcrafted drinks made with premium Japanese matcha.",
    image: "/assets/cs-mitchie-matcha.png",
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
    <article className="flex flex-col items-start gap-[var(--space-7)]">
      <div className="w-full overflow-hidden rounded-[var(--radius-2)]">
        <Image
          src={image}
          alt={title}
          width={593}
          height={330}
          className="h-[220px] w-full object-cover md:h-[330px]"
        />
      </div>
      <div className="flex w-full flex-col gap-[var(--space-2)]">
        <div className="flex w-full items-center justify-between gap-[var(--space-3)]">
          <h3 className="text-h3-medium text-[var(--colours-surface-surface-200)]">
            {title}
          </h3>
          <p className="text-label-12 font-geist-mono shrink-0 tracking-[0.16em] text-[var(--colours-surface-surface-150)]">
            {meta}
          </p>
        </div>
        <p className="text-body-16 text-[var(--colours-surface-surface-150)]">
          {summary}
        </p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1512px] px-[20px] md:px-[47px]">
      <Nav />

      {/* ——— Hero ——— */}
      <section className="relative flex flex-col items-center pb-[80px] pt-[64px]">
        <p className="hero-title text-[var(--colours-surface-surface-200)]">
          Hi, I&apos;m <em>Rose.</em>
        </p>
        <p className="text-label-16 font-geist-mono mt-[var(--space-3)] text-[var(--colours-surface-surface-150)]">
          I design products for good and create with intention.
        </p>
      </section>

      {/* ——— Work ——— */}
      <section
        id="work"
        className="mx-auto flex w-full max-w-[1212px] flex-col items-start gap-[var(--space-12)]"
      >
        <div className="flex w-full flex-col gap-[var(--space-12)] md:grid md:grid-cols-2 md:gap-x-[26px] md:gap-y-[var(--space-12)]">
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

      {/* ——— Footer ——— */}
      <footer className="mx-auto mt-[120px] w-full max-w-[1212px] border-t border-[var(--colours-surface-surface-30)] pb-[var(--space-12)] pt-[var(--space-9)]">
        <p className="text-label-12 font-geist-mono mb-[var(--space-3)] tracking-[0.16em] text-[var(--colours-surface-surface-150)]">
          Let&apos;s create
        </p>
        <div className="text-label-12 font-geist-mono flex flex-col gap-[var(--space-1)] tracking-[0.16em] text-[var(--colours-surface-surface-200)]">
          <p>[ Email ]</p>
          <p>[ LinkedIn ]</p>
        </div>
      </footer>
    </main>
  );
}
