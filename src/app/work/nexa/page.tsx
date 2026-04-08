"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { NEXA_DEMO_GIF, NEXA_LANDING_GIF } from "@/lib/publicAssets";

// Figma asset URLs (valid for 7 days from 2026-04-07)
const IMG_OVERVIEW =
  "https://www.figma.com/api/mcp/asset/85e2696c-761e-423d-a8cd-3c1cbff69d28";
const IMG_SOLUTION =
  "https://www.figma.com/api/mcp/asset/339e0f50-790a-41a1-9fc8-ba62d8381dbe";
const IMG_AUDIT_TOP =
  "https://www.figma.com/api/mcp/asset/ebc76321-a484-491d-85a0-650297cda8b5";
const IMG_AUDIT_BTM =
  "https://www.figma.com/api/mcp/asset/d600d46a-8fa2-48ff-bccd-1c7b3102a939";
const IMG_BULLET_ARROW =
  "https://www.figma.com/api/mcp/asset/f5f5b73d-2e57-46ed-ba5f-52d34c1d22f9";
const IMG_BULLET_CHECK =
  "https://www.figma.com/api/mcp/asset/3830b1ac-cff3-4f11-8504-a1eec9fee925";
const IMG_DS_TL = "https://www.figma.com/api/mcp/asset/292ca8bc-960f-4b05-8d1e-2a990ce7de30";
const IMG_DS_TR = "https://www.figma.com/api/mcp/asset/56e51b0b-658d-4271-ad1a-c1fa98abef46";
const IMG_DS_BL = "https://www.figma.com/api/mcp/asset/322f8032-d3c8-4d42-a89f-26b0bb924a20";
const IMG_DS_BR = "https://www.figma.com/api/mcp/asset/28d26de9-a405-45fc-a7d0-3d7dfa2625af";
const IMG_CHAT_OLD = "https://www.figma.com/api/mcp/asset/ff4a038f-dab8-4e8b-be18-dcef09a6eea6";
const IMG_BULLET_DIAMOND =
  "https://www.figma.com/api/mcp/asset/1b7634a2-43dc-4153-84c9-5b6760ed0a68";
const IMG_BULLET_CROSS =
  "https://www.figma.com/api/mcp/asset/dbcef6e9-3ab6-4fb0-966a-4ff82da00373";
const IMG_PROBLEM_TOP =
  "https://www.figma.com/api/mcp/asset/97da71ba-3fd0-4942-9aa0-b0fec984a3c0";
const IMG_PROBLEM_BTM =
  "https://www.figma.com/api/mcp/asset/4c4261e5-7ead-4eb4-8e91-de5d651da2c8";

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
            className="font-geist-mono text-[14px] leading-[1.41] uppercase inline-flex items-center justify-center bg-[var(--colours-primary-primary-200)] px-[var(--space-1)] py-[var(--space-0)] text-[var(--colours-surface-surface-200)]"
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
        <div className="mt-[33px] h-[549px] rounded-[var(--radius-3)] overflow-hidden bg-[#d9d9d9]">
          <Image
            src="/assets/nexa-thumbnail.png"
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
          className="mt-[184px] flex items-center gap-[var(--space-6)]"
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
          <div className="w-[488px] h-[352px] rounded-[var(--radius-4)] border border-[var(--colours-surface-surface-10)] bg-[var(--colours-surface-surface-10)] p-[var(--space-3)] flex flex-col items-start shrink-0">
            {/* aspect-[314/221] matches Figma inner image container */}
            <div className="relative rounded-[var(--radius-2)] overflow-hidden shrink-0 w-full" style={{ aspectRatio: "314/221" }}>
              <img
                alt="Nexa app overview"
                className="absolute max-w-none pointer-events-none rounded-[var(--radius-2)]"
                style={{
                  height: "142.46%",
                  left: "-57.75%",
                  top: "-42.35%",
                  width: "182.89%",
                }}
                src={IMG_OVERVIEW}
              />
            </div>
          </div>
        </section>

        {/* ——— Problem ——— */}
        <section
          id="problem"
          className="mt-[183px] flex flex-col gap-[54px]"
        >
          {/* Heading row */}
          <div className="flex items-end gap-[232px]">
            <div className="flex flex-col gap-[var(--space-3)] items-start leading-[1.41] shrink-0 w-[387px]">
              <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] w-full">
                PROBLEM
              </p>
              <h2 className="text-h2-regular text-[var(--colours-surface-surface-200)] w-full">
                No Design System = Continuous Inconsistencies
              </h2>
            </div>
            <div className="w-[490px] text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] shrink-0">
              <p className="leading-[1.41]">
                During the project kick-off with the founder, he revealed that
                the development team was working purely off the design.
              </p>
              <p className="leading-[1.41]">&nbsp;</p>
              <p className="leading-[1.41]">
                This led the team to run into two key problems:
              </p>
            </div>
          </div>

          {/* Image card + Bullets row */}
          <div className="flex items-center gap-[129px]">
            {/* Left: image card */}
            <div className="bg-[var(--colours-surface-surface-10)] border border-[var(--colours-surface-surface-10)] flex flex-col gap-[var(--space-8)] items-end p-[var(--space-3)] rounded-[var(--radius-4)] shrink-0 w-[490px]">
              {/* Top image — aspect 548/132, cropped */}
              <div className="relative rounded-[var(--radius-2)] overflow-hidden shrink-0 w-full" style={{ aspectRatio: "548/132" }}>
                <img
                  alt="Design inconsistencies — spacing audit"
                  className="absolute max-w-none pointer-events-none rounded-[var(--radius-2)]"
                  style={{ height: "152.13%", left: "-6.36%", top: "-26.73%", width: "112.87%" }}
                  src={IMG_PROBLEM_TOP}
                />
              </div>
              {/* Bottom image — aspect 456/200, cover */}
              <div className="relative rounded-[var(--radius-2)] overflow-hidden shrink-0 w-full" style={{ aspectRatio: "456/200" }}>
                <img
                  alt="Design inconsistencies — typography audit"
                  className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--radius-2)] w-full h-full"
                  src={IMG_PROBLEM_BTM}
                />
              </div>
            </div>

            {/* Right: bullet lists */}
            <div className="w-[490px] flex flex-col gap-[var(--space-8)] shrink-0">
              {/* Design Inconsistencies */}
              <div className="flex flex-col gap-[var(--space-3)]">
                <h3 className="text-h3-medium text-[var(--colours-surface-surface-200)] w-full">
                  Design Inconsistencies
                </h3>
                <div className="flex flex-col gap-[var(--space-1)]">
                  <div className="flex gap-[var(--space-4)] items-center py-[12px] w-full">
                    <div className="relative shrink-0 w-[13px] h-[13px]">
                      <img alt="" className="absolute block max-w-none w-full h-full" src={IMG_BULLET_DIAMOND} />
                    </div>
                    <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] whitespace-nowrap">
                      <span>Element spacing and radiuses were </span>
                      <span className="text-[var(--colours-surface-surface-200)]">inconsistent</span>
                    </p>
                  </div>
                  <div className="flex gap-[var(--space-4)] items-center py-[12px] w-full">
                    <div className="relative shrink-0 w-[13px] h-[13px]">
                      <img alt="" className="absolute block max-w-none w-full h-full" src={IMG_BULLET_DIAMOND} />
                    </div>
                    <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] whitespace-pre">
                      <span className="text-[var(--colours-surface-surface-200)]">Undefined typography styles</span>
                      <span> led to random font sizes  </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Lack of Systematized UI */}
              <div className="flex flex-col gap-[var(--space-3)]">
                <h3 className="text-h3-medium text-[var(--colours-surface-surface-200)] w-full">
                  Lack of Systematized UI
                </h3>
                <div className="flex flex-col gap-[var(--space-1)]">
                  <div className="flex flex-col items-start py-[var(--space-2)] w-full">
                    <div className="flex gap-[var(--space-4)] items-center w-full">
                      <div className="relative shrink-0 w-[21px] h-[22px]">
                        <img alt="" className="absolute block max-w-none w-full h-full" src={IMG_BULLET_CROSS} />
                      </div>
                      <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] whitespace-nowrap">
                        <span>No pre-existing components meant</span>
                        <span className="text-[var(--colours-surface-surface-200)]"> difficulty with scaling</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start py-[var(--space-2)] w-full">
                    <div className="flex gap-[var(--space-4)] items-end w-full">
                      <div className="relative shrink-0 w-[21px] h-[22px]">
                        <img alt="" className="absolute block max-w-none w-full h-full" src={IMG_BULLET_CROSS} />
                      </div>
                      <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] whitespace-nowrap">
                        <span>Current designs didn&apos;t show how </span>
                        <span className="text-[var(--colours-surface-surface-200)]">specific features worked</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ——— Process ——— */}
        <section id="process" className="mt-[171px] flex flex-col gap-[var(--space-4)]">
          <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] uppercase">
            PROCESS
          </p>

          {/* Step 01 */}
          <div className="flex gap-[69px] items-start">
            <p className="text-h2-regular text-[var(--colours-surface-surface-200)] shrink-0 whitespace-nowrap">
              01
            </p>
            <div className="flex gap-[26px] items-start shrink-0">
              {/* Left: text content */}
              <div className="flex flex-col gap-[var(--space-7)] items-start shrink-0 w-[490px]">
                <div className="flex flex-col gap-[var(--space-4)] items-start w-full">
                  <h3 className="text-h2-regular text-[var(--colours-surface-surface-200)] w-full">
                    Conduct an Audit
                  </h3>
                  <div className="text-[16px] text-[var(--colours-surface-surface-150)] w-full">
                    <p className="leading-[1.41]">
                      I started by{" "}
                      <span className="text-[var(--colours-surface-surface-200)]">organizing their pre-existing screens</span>
                      {" "}in order.
                    </p>
                    <p className="leading-[1.41]">&nbsp;</p>
                    <p className="leading-[1.41]">
                      Using{" "}
                      <span className="text-[var(--colours-surface-surface-200)]">Headway&apos;s community UX Audit file</span>
                      , I added categorized suggestions into three annotations detailing{" "}
                      <span className="text-[var(--colours-surface-surface-200)]">friction points, severity rankings, and &ldquo;Quick Win&rdquo; UX improvements</span>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-[var(--space-5)] items-start w-full">
                  <h4 className="text-h3-medium text-[var(--colours-surface-surface-200)] w-full">
                    Key Improvements
                  </h4>
                  <div className="flex flex-col gap-[var(--space-7)] items-start w-full">
                    {/* Improvement 1 */}
                    <div className="flex gap-[var(--space-4)] items-end w-full">
                      <div className="relative shrink-0 w-[23px] h-[23px]">
                        <img alt="" className="absolute block max-w-none w-full h-full" src={IMG_BULLET_ARROW} />
                      </div>
                      <p className="flex-1 text-[16px] text-[var(--colours-surface-surface-150)] leading-[1.41]">
                        <span className="text-[var(--colours-surface-surface-200)]">Revise current colour palette</span>
                        {" "}as it felt cold/uninviting
                      </p>
                    </div>
                    {/* Improvement 2 */}
                    <div className="flex gap-[var(--space-4)] items-center w-full">
                      <div className="relative shrink-0 w-[23px] h-[22px]">
                        <img alt="" className="absolute block max-w-none w-full h-full" src={IMG_BULLET_CHECK} />
                      </div>
                      <p className="flex-1 text-[16px] text-[var(--colours-surface-surface-150)] leading-[1.41]">
                        Create a system for icons, buttons, gaps, typography to maintain{" "}
                        <span className="text-[var(--colours-surface-surface-200)]">consistency and reusability</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: image card */}
              <div className="bg-[var(--colours-surface-surface-10)] border border-[var(--colours-surface-surface-10)] flex flex-col gap-[var(--space-2)] h-[596px] items-start p-[var(--space-3)] rounded-[var(--radius-4)] shrink-0 w-[490px]">
                {/* Top screenshot — aspect 1664/986, object-cover */}
                <div className="relative rounded-[var(--radius-2)] overflow-hidden shrink-0 w-full" style={{ aspectRatio: "1664/986" }}>
                  <img
                    alt="UX Audit — organized screens"
                    className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[var(--radius-2)] w-full h-full"
                    src={IMG_AUDIT_TOP}
                  />
                </div>
                {/* Bottom screenshot — fills remaining height, cropped */}
                <div className="flex-1 min-h-0 relative rounded-[var(--space-1)] w-full overflow-hidden">
                  <img
                    alt="UX Audit — annotations"
                    className="absolute max-w-none pointer-events-none w-full"
                    style={{ height: "160.7%", left: "0", top: "-60.57%" }}
                    src={IMG_AUDIT_BTM}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 02 */}
          <div className="mt-[62px] flex gap-[62px] items-start">
            <p className="text-h2-regular text-[var(--colours-surface-surface-200)] shrink-0 whitespace-nowrap">
              02
            </p>
            <div className="flex flex-col gap-[var(--space-9)] items-end shrink-0 w-[1008px]">
              {/* Title + description */}
              <div className="flex gap-[162px] items-start w-full">
                <h3 className="text-h2-regular text-[var(--colours-surface-surface-200)] shrink-0 whitespace-nowrap">
                  Creating a Design System
                </h3>
                <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] w-[490px] shrink-0">
                  Established a mini component library including spacing, typography, and radiuses.
                </p>
              </div>
              {/* 2×2 image grid */}
              <div
                className="bg-[var(--colours-surface-surface-10)] border border-[var(--colours-surface-surface-10)] rounded-[var(--radius-4)] px-[var(--space-3)] py-[var(--space-3)] grid grid-cols-2 gap-[24px] w-full"
                style={{ gridTemplateRows: "367px auto" }}
              >
                {/* Top-left */}
                <div className="relative rounded-[var(--radius-2)] overflow-hidden">
                  <img
                    alt="Design system — colour tokens"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[var(--radius-2)]"
                    src={IMG_DS_TL}
                  />
                </div>
                {/* Top-right */}
                <div className="relative rounded-[var(--radius-2)] overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-2)]">
                    <img
                      alt="Design system — typography"
                      className="absolute max-w-none pointer-events-none"
                      style={{ height: "100.18%", left: "-1.02%", top: "-0.72%", width: "102.04%" }}
                      src={IMG_DS_TR}
                    />
                  </div>
                </div>
                {/* Bottom-left */}
                <div className="relative h-[394px] rounded-[var(--radius-2)] overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden rounded-[var(--radius-2)]">
                    <img
                      alt="Design system — components"
                      className="absolute max-w-none pointer-events-none"
                      style={{ height: "100%", left: "-0.08%", top: "0", width: "122.78%" }}
                      src={IMG_DS_BL}
                    />
                  </div>
                </div>
                {/* Bottom-right */}
                <div className="relative rounded-[var(--radius-2)] overflow-hidden">
                  <img
                    alt="Design system — spacing"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[var(--radius-2)]"
                    src={IMG_DS_BR}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 03 */}
          <div className="mt-[56px] flex gap-[62px] items-start">
            <p className="text-h2-regular text-[var(--colours-surface-surface-200)] shrink-0 whitespace-nowrap">
              03
            </p>
            <div className="flex flex-col gap-[41px] items-start w-[1006px]">
              <h3 className="text-h2-regular text-[var(--colours-surface-surface-200)] w-full">
                Re-design Key User Screens
              </h3>
              <div className="flex flex-col gap-[var(--space-9)] items-start w-full">
                {/* Images row */}
                <div className="flex gap-[28px] items-center w-full">
                  {/* Old chat interface */}
                  <div className="relative h-[276px] w-[488px] rounded-[var(--radius-2)] overflow-hidden shrink-0">
                    <img
                      alt="Old chat interface"
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[var(--radius-2)]"
                      src={IMG_CHAT_OLD}
                    />
                  </div>
                  {/* New chat interface */}
                  <div className="relative h-[276px] w-[488px] rounded-[var(--radius-2)] overflow-hidden shrink-0">
                    <img
                      alt="Improved chat interface"
                      className="absolute inset-0 w-full h-full object-cover rounded-[var(--radius-2)]"
                      src={NEXA_DEMO_GIF}
                    />
                  </div>
                </div>
                {/* Captions row */}
                <div className="flex gap-[26px] items-center w-full text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)]">
                  <p className="w-[490px] shrink-0">
                    Old Chat Interface: Non-conversational, feels like a digital document &gt; a space for users to establish trust with Nexa
                  </p>
                  <p className="w-[489px] shrink-0">
                    Improved Chat Interface: Conversational tone, helps with users trust Nexa with their health information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ——— Solution ——— */}
        <section id="solution" className="mt-[171px] flex flex-col gap-[var(--space-11)]">
          {/* Header */}
          <div className="flex flex-col gap-[var(--space-3)]">
            <p className="text-[16px] leading-[1.41] text-[var(--colours-surface-surface-150)] uppercase">
              SOLUTION
            </p>
            <div className="flex gap-[233px] items-start">
              <h2 className="text-h2-regular text-[var(--colours-surface-surface-200)] w-[283px] shrink-0">
                How did I add value?
              </h2>
              <div className="flex flex-col gap-[var(--space-3)] w-[593px] shrink-0">
                <h3 className="text-h3-medium text-[var(--colours-surface-surface-200)]">
                  Landing Page Visual Identity Refresh
                </h3>
                <div className="text-[16px] text-[var(--colours-surface-surface-150)]">
                  <p className="leading-[1.41]">
                    As the sole designer during the startup&apos;s private beta, I built a tokenized design system and streamlined workflows to accelerate delivery.
                  </p>
                  <p className="leading-[1.41]">&nbsp;</p>
                  <p className="leading-[1.41]">
                    From there, I revamped the landing page, refreshing the visual identity and introducing dedicated sections that clearly communicate how Nexa works.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width GIF — aspect 618/350 */}
          <div className="relative rounded-[var(--radius-2)] overflow-hidden w-full" style={{ aspectRatio: "618/350" }}>
            <img
              alt="Nexa landing page refresh"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none rounded-[var(--radius-2)]"
              src={NEXA_LANDING_GIF}
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
