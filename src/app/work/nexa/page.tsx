"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Figma asset URLs (valid for 7 days from 2026-04-07)
const IMG_OVERVIEW =
  "https://www.figma.com/api/mcp/asset/7113c783-9a3e-4008-9843-cf00b9eeef9c";
const IMG_SOLUTION =
  "https://www.figma.com/api/mcp/asset/339e0f50-790a-41a1-9fc8-ba62d8381dbe";
const IMG_AUDIT_TOP =
  "https://www.figma.com/api/mcp/asset/aa575fa3-bdd2-487c-94e9-8956798a887f";
const IMG_AUDIT_BTM =
  "https://www.figma.com/api/mcp/asset/a7dd389d-b71d-45c2-93b1-06e56eee98f7";
const IMG_BULLET_DIAMOND =
  "https://www.figma.com/api/mcp/asset/d340e5c6-b0b4-4df1-a477-d46b29d33e64";
const IMG_BULLET_CROSS =
  "https://www.figma.com/api/mcp/asset/dd6b0b7f-b398-43b3-aafd-0e91952ce749";

const TOP_NAV = [
  { href: "/", label: "WORK" },
  { href: "/playground", label: "PLAYGROUND" },
  { href: "/about", label: "ABOUT" },
  { href: "/resume", label: "RESUME" },
];

const QUICK_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Process" },
  { id: "solution", label: "Solution" },
  { id: "takeaways", label: "Takeaways" },
];

export default function NexaCaseStudy() {
  const [activeSection, setActiveSection] = useState("overview");
  const [clock, setClock] = useState("");

  // Live PST clock
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/Vancouver",
      });
      setClock(t.replace(/ (AM|PM)$/, " PST"));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Scroll-based section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const options: IntersectionObserverInit = {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    QUICK_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id);
      }, options);
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[var(--colours-surface-surface-100)] min-h-screen">
      {/* ——— Left Sidebar ——— */}
      <aside className="fixed top-0 left-0 h-screen w-[227px] flex flex-col bg-[var(--colours-surface-surface-100)] z-10">
        {/* Logo */}
        <div className="mt-[24px] ml-[47px]">
          <Link
            href="/"
            className="font-geist-mono text-[12px] leading-[1.41] uppercase inline-flex items-center justify-center bg-[var(--colours-primary-primary-200)] px-[var(--space-1)] py-[var(--space-0)] text-[var(--colours-surface-surface-200)]"
          >
            ROSE
          </Link>
        </div>

        {/* Quick Links */}
        <nav className="mt-[249px] ml-[47px] flex flex-col gap-[var(--space-3)]">
          {QUICK_LINKS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`cursor-pointer relative shrink-0 text-left ${
                  isActive
                    ? "flex items-center gap-[8px]"
                    : "h-[17px]"
                }`}
              >
                {isActive ? (
                  <>
                    <div className="shrink-0 w-[9px] h-[9px] bg-[var(--colours-primary-primary-300)]" />
                    <span className="font-geist-mono text-[14px] leading-[1.41] uppercase text-[var(--colours-surface-surface-200)] whitespace-nowrap">
                      {label}
                    </span>
                  </>
                ) : (
                  <span className="absolute inset-0 font-geist-mono text-[14px] leading-[1.41] uppercase text-[var(--colours-surface-surface-150)] whitespace-nowrap">
                    {label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Social + Clock */}
        <div className="mt-auto ml-[47px] mb-[40px] flex flex-col gap-[4px]">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-geist-mono text-[12px] leading-[1.41] uppercase text-[var(--colours-surface-surface-150)] hover:text-[var(--colours-primary-primary-300)] transition-colors duration-150"
          >
            Linkedin
          </a>
          <a
            href="mailto:hello@rose.design"
            className="font-geist-mono text-[12px] leading-[1.41] uppercase text-[var(--colours-surface-surface-150)] hover:text-[var(--colours-primary-primary-300)] transition-colors duration-150"
          >
            Email
          </a>
          {clock && (
            <p className="font-geist-mono text-[12px] leading-[1.41] uppercase text-[var(--colours-surface-surface-150)] mt-[4px]">
              {clock}
            </p>
          )}
        </div>
      </aside>

      {/* ——— Main Content ——— */}
      <main className="ml-[227px] pl-[28px] pr-[45px]">
        {/* Top Nav — static at top, right-aligned */}
        <div className="flex justify-end pt-[30px]">
          <nav className="font-geist-mono flex gap-[40px] text-[14px] leading-[1.41] uppercase">
            {TOP_NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={
                  href === "/"
                    ? "text-[var(--colours-primary-primary-300)]"
                    : "nav-link"
                }
              >
                [{label}]
              </Link>
            ))}
          </nav>
        </div>

        {/* Thumbnail */}
        <div className="mt-[33px] h-[549px] rounded-[var(--radius-1)] overflow-hidden bg-[#d9d9d9]">
          <Image
            src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=1300&q=80"
            alt="Nexa Labs"
            width={1212}
            height={549}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Project Metadata */}
        <div className="mt-[46px] flex items-start gap-[181px]">
          <h1
            className="text-display-semi text-[var(--colours-surface-surface-200)] w-[230px] shrink-0"
            style={{ letterSpacing: "-2.5px" }}
          >
            Nexa Labs
          </h1>
          <div className="flex flex-wrap gap-x-[24px] gap-y-[28px] w-[638px]">
            <MetaField label="Role">
              <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)]">
                Product Designer
              </p>
            </MetaField>
            <MetaField label="TEAM" width={179}>
              <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)]">
                Nexa Founder
              </p>
            </MetaField>
            <MetaField label="Timeline" width={226}>
              <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] whitespace-nowrap">
                Feb – March 2026 (1.5 months)
              </p>
            </MetaField>
            <MetaField label="Skills">
              <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)]">
                Project Management
              </p>
            </MetaField>
            <MetaField label="Tools" width={179}>
              <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)]">
                Figma
              </p>
              <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)]">
                Adobe After Effects
              </p>
            </MetaField>
          </div>
        </div>

        {/* ——— Overview ——— */}
        <section
          id="overview"
          className="mt-[184px] flex items-center justify-between"
        >
          <div className="w-[592px] flex flex-col gap-[var(--space-5)] shrink-0">
            <div className="flex flex-col gap-[var(--space-3)]">
              <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] uppercase">
                OVERVIEW – WHAT IS NEXA?
              </p>
              <h2 className="text-h2-regular text-[var(--colours-surface-surface-200)]">
                Where Canadians get connected to healthcare.
              </h2>
            </div>
            <div className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)]">
              <p>
                Nexa Labs is a{" "}
                <span className="text-[var(--colours-surface-surface-200)]">
                  Canadian health-care based platform
                </span>{" "}
                that helps people get{" "}
                <span className="text-[var(--colours-surface-surface-200)]">
                  quicker access to local clinicians.
                </span>
              </p>
              <p className="mt-[1.41em]">
                It replicates a{" "}
                <span className="text-[var(--colours-surface-surface-200)]">
                  walk-in appointment right on your device through chatting
                </span>{" "}
                and sends necessary information over to your family doctor.
              </p>
            </div>
          </div>

          {/* Overview image card */}
          <div className="w-[488px] h-[352px] rounded-[var(--radius-4)] border border-[var(--colours-surface-surface-10)] bg-[var(--colours-surface-surface-10)] p-[var(--space-3)] flex flex-col shrink-0 overflow-hidden">
            <div className="flex-1 rounded-[var(--radius-2)] overflow-hidden">
              <Image
                src={IMG_OVERVIEW}
                alt="Nexa app overview"
                width={456}
                height={321}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ——— Problem ——— */}
        <section
          id="problem"
          className="mt-[183px] flex flex-col gap-[var(--space-8)]"
        >
          {/* Heading row */}
          <div className="flex items-end" style={{ gap: "232px" }}>
            <div
              className="flex flex-col shrink-0"
              style={{ gap: "16px", width: "387px" }}
            >
              <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] uppercase">
                PROBLEM
              </p>
              <h2 className="text-h2-regular text-[var(--colours-surface-surface-200)]">
                No Design System = Continuous Inconsistencies
              </h2>
            </div>
            <div className="w-[490px] text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] shrink-0">
              <p>
                During the project kick-off with the founder, he revealed that
                the development team was working purely off the design.
              </p>
              <p className="mt-[1.41em]">
                This led the team to run into two key problems:
              </p>
            </div>
          </div>

          {/* Image + Bullets row */}
          <div className="flex items-center justify-between">
            <div className="w-[490px] h-[411px] rounded-[var(--radius-2)] bg-[#d9d9d9] shrink-0" />

            <div className="w-[490px] flex flex-col gap-[var(--space-8)] shrink-0">
              {/* Design Inconsistencies */}
              <div className="flex flex-col gap-[var(--space-3)]">
                <h3 className="text-h3-medium text-[var(--colours-surface-surface-200)]">
                  Design Inconsistencies
                </h3>
                <div className="flex flex-col gap-[var(--space-1)]">
                  <BulletRow
                    src={IMG_BULLET_DIAMOND}
                    size={13}
                    align="center"
                    text="Spacing between elements were inconsistent"
                  />
                  <BulletRow
                    src={IMG_BULLET_DIAMOND}
                    size={13}
                    align="center"
                    text="Undefined typography styles led to random font sizes"
                  />
                </div>
              </div>

              {/* Lack of Systematized UI */}
              <div className="flex flex-col gap-[var(--space-3)]">
                <h3 className="text-h3-medium text-[var(--colours-surface-surface-200)]">
                  Lack of Systematized UI
                </h3>
                <div className="flex flex-col gap-[var(--space-1)]">
                  <BulletRow
                    src={IMG_BULLET_CROSS}
                    size={21}
                    align="center"
                    text="No pre-existing components meant difficulty with scaling"
                  />
                  <BulletRow
                    src={IMG_BULLET_CROSS}
                    size={21}
                    align="end"
                    text="Typography styles ≠ undefined"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ——— Process ——— */}
        <section id="process" className="mt-[171px]">
          <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] uppercase mb-[45px]">
            PROCESS
          </p>

          {/* Step 01 */}
          <div className="flex gap-[69px]">
            <p className="text-h2-regular text-[var(--colours-surface-surface-200)] shrink-0 w-[32px]">
              01
            </p>
            <div className="flex gap-[26px]">
              {/* Left: title + content */}
              <div className="w-[490px] shrink-0">
                <h3 className="text-h2-regular text-[var(--colours-surface-surface-200)]">
                  Conduct an Audit
                </h3>
                <div className="mt-[22px] text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)]">
                  <p>
                    I started by{" "}
                    <span className="text-[var(--colours-surface-surface-200)]">
                      organizing their pre-existing screens
                    </span>{" "}
                    in order.
                  </p>
                  <p className="mt-[1.41em]">
                    Using{" "}
                    <span className="text-[var(--colours-surface-surface-200)]">
                      Headway&apos;s community UX Audit file
                    </span>
                    , I added categorized suggestions into three annotations
                    detailing{" "}
                    <span className="text-[var(--colours-surface-surface-200)]">
                      friction points, severity rankings, and &ldquo;Quick
                      Win&rdquo; UX improvements
                    </span>
                    .
                  </p>
                </div>
                <h4 className="text-h3-medium text-[var(--colours-surface-surface-200)] mt-[47px]">
                  Key Improvements
                </h4>
              </div>

              {/* Right: audit image card */}
              <div className="w-[490px] h-[596px] shrink-0 rounded-[var(--radius-4)] border border-[var(--colours-surface-surface-10)] bg-[var(--colours-surface-surface-10)] p-[var(--space-3)] flex flex-col gap-[var(--space-2)]">
                <div
                  className="rounded-[var(--radius-2)] overflow-hidden shrink-0"
                  style={{ aspectRatio: "1664 / 986" }}
                >
                  <Image
                    src={IMG_AUDIT_TOP}
                    alt="UX Audit — organized screens"
                    width={458}
                    height={272}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-h-0 rounded-[var(--space-1)] overflow-hidden relative">
                  <Image
                    src={IMG_AUDIT_BTM}
                    alt="UX Audit — annotations"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 02 */}
          <div className="mt-[62px] flex gap-[69px]">
            <p className="text-h2-regular text-[var(--colours-surface-surface-200)] shrink-0 w-[32px]">
              02
            </p>
            <div className="w-[490px]">
              <h3 className="text-h2-regular text-[var(--colours-surface-surface-200)]">
                Creating a Design System
              </h3>
              <div className="mt-[55px] w-[380px] h-[287px] rounded-[var(--radius-2)] bg-[#d9d9d9]" />
            </div>
          </div>

          {/* Step 03 */}
          <div className="mt-[56px] flex gap-[69px]">
            <p className="text-h2-regular text-[var(--colours-surface-surface-200)] shrink-0 w-[32px]">
              03
            </p>
            <div>
              <h3 className="text-h2-regular text-[var(--colours-surface-surface-200)]">
                Re-design Key User Screens
              </h3>
              <div className="mt-[78px] w-[826px] h-[467px] rounded-[var(--radius-2)] bg-[#d9d9d9]" />
            </div>
          </div>
        </section>

        {/* ——— Solution ——— */}
        <section id="solution" className="mt-[30px]">
          <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] uppercase">
            SOLUTION
          </p>
          <div className="mt-[46px] flex items-start">
            <h2 className="text-h2-regular text-[var(--colours-surface-surface-200)] w-[283px] shrink-0">
              How did I add value?
            </h2>
            <p
              className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] w-[490px] shrink-0 mt-[7px]"
              style={{ marginLeft: "334px" }}
            >
              By creating a tokenized design system,
            </p>
          </div>
          <div
            className="mt-[92px] w-[694px] h-[393px] rounded-[var(--radius-2)] overflow-hidden"
            style={{ marginLeft: "411px" }}
          >
            <Image
              src={IMG_SOLUTION}
              alt="Solution — design system overview"
              width={694}
              height={393}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* ——— Takeaways ——— */}
        <section id="takeaways" className="mt-[200px] pb-[120px]">
          <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] uppercase">
            TAKEAWAYS
          </p>
        </section>
      </main>
    </div>
  );
}

/* ——— Helper Components ——— */

function MetaField({
  label,
  children,
  width = 181,
}: {
  label: string;
  children: React.ReactNode;
  width?: number;
}) {
  return (
    <div
      className="flex flex-col gap-[var(--space-4)]"
      style={{ width: `${width}px` }}
    >
      <p className="font-geist-mono text-[14px] leading-[1.41] text-[var(--colours-surface-surface-200)] uppercase">
        {label}
      </p>
      <div className="flex flex-col gap-[var(--space-2)]">{children}</div>
    </div>
  );
}

function BulletRow({
  src,
  size,
  text,
  align,
}: {
  src: string;
  size: number;
  text: string;
  align: "center" | "end";
}) {
  return (
    <div
      className={`flex gap-[var(--space-4)] py-[12px]`}
      style={{ alignItems: align }}
    >
      <Image src={src} alt="" width={size} height={size} className="shrink-0" />
      <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)]">
        {text}
      </p>
    </div>
  );
}
