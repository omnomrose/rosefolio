"use client";

import Image from "next/image";
import Nav from "@/components/Nav";
import { useState, useRef, useEffect, useCallback } from "react";

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (videoId: string) => void;
  destroy: () => void;
}

interface YTPlayerEvent {
  data: number;
}

// discOrigin: transform-origin that places the rotation axis on the true
// centre of the vinyl disc within the 650×650 rendered container.
//
// Local assets are all 2533×2646 @1x (portrait). With object-cover on a
// 650×650 square, the width governs the scale (×0.2566) and 14.4 px are
// cropped symmetrically from top and bottom. Pixel analysis gives the disc
// centre at 50.09 % x / 51.53 % y of the raw image, which maps to
// ≈50 % x / 51.65 % y inside the cropped container.
//
// Girl Like Me uses a 3000×3000 square, so no correction is needed (50 % 50 %).
const albums = [
  {
    title: "GIRL LIKE ME",
    cover: "https://www.figma.com/api/mcp/asset/3caca683-8bd3-4de4-9548-5c79921f7020",
    vinyl:
      "https://blood-records.co.uk/cdn/shop/files/BLOOD467-PinkPanth-Graphic_3000x3000.png?v=1745339309",
    youtubeId: "D24dn9eXTwA",
    discOrigin: "50% 50%",
  },
  {
    title: "LES FLEURS",
    cover: "https://www.figma.com/api/mcp/asset/949e7238-4f60-4b59-b0ae-3c3dcf86e8f4",
    vinyl: "/assets/les-fleurs-vinyl@2x.png",
    youtubeId: "g1kDd6yBQZ4",
    discOrigin: "50% 51.65%",
  },
  {
    title: "LOSING YOU",
    cover: "https://www.figma.com/api/mcp/asset/66b8f42e-dea0-4cd2-ad9a-892c54a447c5",
    vinyl: "/assets/losing-you-vinyl@3x.png",
    youtubeId: "nFL_zxA5gqo",
    discOrigin: "50% 51.65%",
  },
  {
    title: "PARADISE",
    cover: "https://www.figma.com/api/mcp/asset/dfa80ca1-ad11-4e28-aa36-801d25ce51d6",
    vinyl: "/assets/paradise-vinyl@2x.png",
    youtubeId: "HywzuV7yYmg",
    discOrigin: "50% 51.65%",
  },
  {
    title: "WATCHLAR",
    cover: "https://www.figma.com/api/mcp/asset/a28fbc5c-3a95-44e0-b3fb-ca3938ed4433",
    vinyl: "/assets/watchlar-vinyl@2x.png",
    youtubeId: "1KXCa8tQ87M",
    discOrigin: "50% 51.65%",
  },
  {
    title: "HUIT OCTOBRE 1971",
    cover: "https://www.figma.com/api/mcp/asset/18a2b0e0-cf63-4be0-95af-741b51aa47d2",
    vinyl: "/assets/huit-octobre-vinyl.png",
    youtubeId: "-VqRYD4qPmI",
    discOrigin: "50% 51.65%",
  },
  {
    title: "EVERYTHING IS EMBARRASSING",
    cover: "https://www.figma.com/api/mcp/asset/055165be-2ff6-46ca-aae5-c436dccf623b",
    vinyl: "/assets/everything-is-embarassing-vinyl@2x.png",
    youtubeId: "u6VaHQw4c60",
    discOrigin: "50% 51.65%",
  },
];

const IMG_PORTRAIT =
  "https://www.figma.com/api/mcp/asset/73af5a0a-873f-4e5c-adf0-6c577d92aa76";
const IMG_NEEDLE = "/assets/record-needle@3x.png";

const WAVE_BARS = [
  { height: 19, duration: "0.55s", delay: "0s" },
  { height: 29, duration: "0.7s", delay: "0.15s" },
  { height: 22, duration: "0.48s", delay: "0.05s" },
  { height: 22, duration: "0.62s", delay: "0.3s" },
  { height: 15, duration: "0.57s", delay: "0.2s" },
];

function AudioWaves({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-center gap-[4px]">
      {WAVE_BARS.map((bar, i) => (
        <div
          key={i}
          className="w-[4px] rounded-[40px] transition-colors duration-300"
          style={{
            height: bar.height,
            backgroundColor: playing
              ? "var(--colours-primary-primary-200)"
              : "#d9d9d9",
            transformOrigin: "center",
            animation: playing
              ? `audio-bar ${bar.duration} ${bar.delay} ease-in-out infinite`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

declare global {
  interface Window {
    YT: {
      Player: new (
        el: string,
        config: {
          height: string;
          width: string;
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: () => void;
            onStateChange?: (e: YTPlayerEvent) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

function useYouTubePlayer() {
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadedId, setLoadedId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    function createPlayer() {
      if (!mounted) return;
      playerRef.current = new window.YT.Player("yt-player", {
        height: "0",
        width: "0",
        videoId: "",
        playerVars: { autoplay: 0, controls: 0, modestbranding: 1 },
        events: {
          onReady: () => {
            readyRef.current = true;
          },
          onStateChange: (e: YTPlayerEvent) => {
            if (!mounted) return;
            if (e.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            } else if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (e.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
        },
      });
    }

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      mounted = false;
      playerRef.current?.destroy();
    };
  }, []);

  const toggle = useCallback(
    (videoId: string) => {
      if (!readyRef.current || !playerRef.current) return;
      if (loadedId === videoId && isPlaying) {
        playerRef.current.pauseVideo();
      } else if (loadedId === videoId && !isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.loadVideoById(videoId);
        setLoadedId(videoId);
      }
    },
    [isPlaying, loadedId]
  );

  const pause = useCallback(() => {
    if (readyRef.current && playerRef.current && isPlaying) {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  return { isPlaying, loadedId, toggle, pause };
}

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isPlaying, loadedId, toggle, pause } = useYouTubePlayer();

  const activeAlbum = albums[activeIndex];
  const vinylSpinning = isPlaying && loadedId === activeAlbum.youtubeId;

  function handleVinylClick() {
    toggle(activeAlbum.youtubeId);
  }

  function handleAlbumSelect(i: number) {
    if (isPlaying && loadedId !== albums[i].youtubeId) {
      pause();
    }
    setActiveIndex(i);
  }

  function handlePrev() {
    const prevIndex = (activeIndex - 1 + albums.length) % albums.length;
    if (isPlaying && loadedId !== albums[prevIndex].youtubeId) pause();
    setActiveIndex(prevIndex);
  }

  function handleNext() {
    const nextIndex = (activeIndex + 1) % albums.length;
    if (isPlaying && loadedId !== albums[nextIndex].youtubeId) pause();
    setActiveIndex(nextIndex);
  }

  return (
    <main className="mx-auto w-full max-w-[1512px] px-[20px] md:px-[47px]">
      <Nav />

      {/* Hidden YouTube player */}
      <div className="pointer-events-none fixed left-[-9999px] top-[-9999px] size-0 overflow-hidden">
        <div id="yt-player" />
      </div>

      {/* Preload all vinyl images eagerly so switching is instant.
          loading="eager" is required because these are off-screen;
          the default lazy behaviour would never fetch them. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[-9999px] top-[-9999px] size-0 overflow-hidden"
      >
        {albums.map((album) => (
          <Image
            key={album.vinyl}
            src={album.vinyl}
            alt=""
            width={650}
            height={679}
            sizes="650px"
            loading="eager"
          />
        ))}
      </div>

      {/* ——— About Hero ——— */}
      <section className="mt-[56px] flex flex-col gap-[56px] md:flex-row md:gap-[80px]">
        <div className="mx-auto w-[284px] shrink-0 md:mx-0 md:ml-[calc(14.29%-10px)]">
          <Image
            src={IMG_PORTRAIT}
            alt="Rose Nguyen"
            width={284}
            height={360}
            className="h-[360px] w-[284px] object-cover"
            unoptimized
          />
        </div>

        <div className="flex max-w-[593px] flex-col gap-[var(--space-5)]">
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[30px] leading-[1.41] text-[var(--colours-surface-surface-200)]">
            Hi! Welcome to my little digital corner ⋆˚｡
          </h1>

          <div className="text-body-16 text-[var(--colours-surface-surface-150)] leading-[0] whitespace-pre-wrap">
            <p className="mb-0">
              <span className="leading-[1.41]">Some things about me – </span>
              <span className="leading-[1.41] text-[var(--colours-surface-surface-200)]">I fell in love with design during my childhood,</span>
              <span className="leading-[1.41]"> playing on Kid Pix on the shared family computer. Being exposed to design at a young age has allowed me to always </span>
              <span className="leading-[1.41] text-[var(--colours-surface-surface-200)]">approach problems from curiosity-driven perspective.</span>
            </p>
            <p className="leading-[1.41] mb-0">&nbsp;</p>
            <p className="mb-0">
              <span className="leading-[1.41]">I&apos;m a huge advocate for </span>
              <span className="leading-[1.41] text-[var(--colours-surface-surface-200)]">designing for lived experiences</span>
              <span className="leading-[1.41]"> </span>
              <span className="leading-[1.41] text-[var(--colours-surface-surface-200)]">and working with people for people.</span>
              <span className="leading-[1.41]"> There&apos;s just something about empathy and storytelling that automation can&apos;t replace.</span>
            </p>
            <p className="leading-[1.41] mb-0">&nbsp;</p>
            <p>
              <span className="leading-[1.41]">I am a </span>
              <span className="leading-[1.41] text-[var(--colours-surface-surface-200)]">continuous learner for life and I love creating tangible products for people.</span>
            </p>
          </div>

          <p className="font-geist-mono text-[16px] leading-[1.41] uppercase">
            <span className="text-[var(--colours-surface-surface-200)]">HUNGRY FOR MORE? </span>
            <span className="text-[var(--colours-primary-primary-300)]">CHECK OUT MY FRIDGE:</span>
          </p>
        </div>
      </section>

      {/* ——— Vinyl / Music Section ——— */}
      <section className="relative mt-[100px] pb-[120px]">
        <p className="font-geist-mono mb-[var(--space-5)] text-[16px] leading-[1.41] uppercase text-[var(--colours-surface-surface-150)]">
          {vinylSpinning
            ? `NOW PLAYING: ${activeAlbum.title}`
            : `CLICK THE VINYL TO PLAY: ${activeAlbum.title}`}
        </p>

        <div className="flex flex-col items-start gap-[56px] md:flex-row">
          {/* Vinyl + Needle */}
          <button
            onClick={handleVinylClick}
            aria-label={
              vinylSpinning
                ? `Pause ${activeAlbum.title}`
                : `Play ${activeAlbum.title}`
            }
            className="relative mx-auto h-[650px] w-[650px] shrink-0 cursor-pointer border-none bg-transparent md:mx-0"
          >
            <div
              className={`absolute inset-0 ${vinylSpinning ? "vinyl-spinning" : ""}`}
              style={{
                transformOrigin: activeAlbum.discOrigin,
                ...(!vinylSpinning && { transform: "rotate(168deg)" }),
              }}
            >
              <Image
                src={activeAlbum.vinyl}
                alt={`${activeAlbum.title} vinyl record`}
                width={650}
                height={679}
                sizes="650px"
                priority
                className="size-full object-cover"
              />
            </div>
            <div
              className="absolute -right-[40px] top-[-40px] h-[574px] w-[143px] transition-transform duration-500"
              style={{
                transformOrigin: "50% 10%",
                transform: vinylSpinning ? "rotate(8deg)" : "rotate(0deg)",
              }}
            >
              <Image
                src={IMG_NEEDLE}
                alt="Record needle"
                width={143}
                height={574}
                sizes="143px"
                priority
                className="size-full object-contain"
              />
            </div>
          </button>

          {/* Album covers + Player */}
          <div className="flex w-full flex-col gap-[var(--space-9)]">
            <div className="flex flex-wrap gap-[var(--space-1)]">
              {albums.map((album, i) => (
                <button
                  key={album.title}
                  onClick={() => handleAlbumSelect(i)}
                  className="group flex flex-col items-center gap-[var(--space-3)]"
                >
                  <div
                    className={`size-[77px] overflow-hidden border transition-colors duration-150 ${
                      i === activeIndex
                        ? "border-[var(--colours-primary-primary-200)]"
                        : "border-[var(--colours-surface-surface-200)]"
                    }`}
                  >
                    <Image
                      src={album.cover}
                      alt={album.title}
                      width={77}
                      height={77}
                      sizes="154px"
                      className="size-full object-cover"
                    />
                  </div>
                  <span className="font-geist-mono w-[77px] text-center text-[12px] leading-[1.41] uppercase text-[var(--colours-surface-surface-200)]">
                    {album.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Audio player controls */}
            <div className="flex flex-col items-start gap-[var(--space-3)]">
              <AudioWaves playing={vinylSpinning} />
              <div className="flex items-center gap-[var(--space-5)]">
                <button
                  onClick={handlePrev}
                  aria-label="Previous track"
                  className="flex size-[34px] items-center justify-center text-[var(--colours-surface-surface-200)]"
                >
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor">
                    <path d="M13 1.5L4 9l9 7.5V1.5zM1 1v16" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>

                <p className="font-geist-mono text-[16px] leading-[1.41] uppercase text-[var(--colours-surface-surface-200)]">
                  {activeAlbum.title}
                </p>

                <button
                  onClick={handleNext}
                  aria-label="Next track"
                  className="flex size-[34px] items-center justify-center text-[var(--colours-surface-surface-200)]"
                >
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor">
                    <path d="M1 1.5L10 9l-9 7.5V1.5zM13 1v16" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
