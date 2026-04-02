"use client";

import Image from "next/image";
import Nav from "@/components/Nav";
import { useState, useRef, useEffect, useCallback } from "react";

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
}

interface YTPlayerEvent {
  data: number;
}

const YOUTUBE_VIDEO_ID = "D24dn9eXTwA";

const albums = [
  {
    title: "GIRL LIKE ME",
    cover:
      "https://www.figma.com/api/mcp/asset/ec54e93a-d5d4-47b8-a006-79c552954865",
    youtubeId: YOUTUBE_VIDEO_ID,
  },
  {
    title: "LES FLEURS",
    cover:
      "https://www.figma.com/api/mcp/asset/f6876aca-617c-4746-aef9-07cab5ac2164",
  },
  {
    title: "DIRTY DANCER",
    cover:
      "https://www.figma.com/api/mcp/asset/0a9d6cb6-59c2-47b5-80da-77547702d8e4",
  },
  {
    title: "PARADISE",
    cover:
      "https://www.figma.com/api/mcp/asset/105d465d-7779-4bed-b146-06d41d16053e",
  },
  {
    title: "WATCHLAR",
    cover:
      "https://www.figma.com/api/mcp/asset/087de667-2b41-4d4c-ab2f-24d4bb4ca45b",
  },
  {
    title: "UH UH",
    cover:
      "https://www.figma.com/api/mcp/asset/7f85da9d-1d28-4370-ab35-79bff5c6c5ae",
  },
  {
    title: "EVERYTHING IS EMBARRASSING",
    cover:
      "https://www.figma.com/api/mcp/asset/78a4a6ef-106e-4436-bb18-6d0b21f5b95c",
  },
];

const IMG_PORTRAIT =
  "https://www.figma.com/api/mcp/asset/73af5a0a-873f-4e5c-adf0-6c577d92aa76";
const IMG_VINYL =
  "https://www.figma.com/api/mcp/asset/46f0b436-3566-498f-b769-3cee58190e32";
const IMG_NEEDLE =
  "https://www.figma.com/api/mcp/asset/cd5b8a9c-c5a2-4b52-9657-66a881d1a317";

function AudioWaves({ playing }: { playing: boolean }) {
  const bars = [19, 29, 22, 22, 15];
  return (
    <div className="flex items-center gap-[4px]">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[4px] rounded-[40px] transition-colors duration-300"
          style={{
            height: h,
            backgroundColor: playing
              ? "var(--colours-primary-primary-200)"
              : "#d9d9d9",
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

function useYouTubePlayer(videoId: string) {
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let mounted = true;

    function createPlayer() {
      if (!mounted) return;
      playerRef.current = new window.YT.Player("yt-player", {
        height: "0",
        width: "0",
        videoId,
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
  }, [videoId]);

  const toggle = useCallback(() => {
    if (!readyRef.current || !playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    if (readyRef.current && playerRef.current && isPlaying) {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  return { isPlaying, toggle, pause };
}

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isPlaying, toggle, pause } = useYouTubePlayer(YOUTUBE_VIDEO_ID);
  const isGirlLikeMe = activeIndex === 0;

  function handleVinylClick() {
    if (isGirlLikeMe) {
      toggle();
    }
  }

  function handleAlbumSelect(i: number) {
    if (i !== 0 && isPlaying) {
      pause();
    }
    setActiveIndex(i);
  }

  function handlePrev() {
    if (isPlaying) pause();
    setActiveIndex((activeIndex - 1 + albums.length) % albums.length);
  }

  function handleNext() {
    if (isPlaying) pause();
    setActiveIndex((activeIndex + 1) % albums.length);
  }

  const vinylSpinning = isGirlLikeMe && isPlaying;

  return (
    <main className="mx-auto w-full max-w-[1512px] px-[20px] md:px-[47px]">
      <Nav />

      {/* Hidden YouTube player */}
      <div className="pointer-events-none fixed left-[-9999px] top-[-9999px] size-0 overflow-hidden">
        <div id="yt-player" />
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

          <div className="text-body-16 flex flex-col gap-[var(--space-3)] text-[var(--colours-surface-surface-200)]">
            <p>
              Some things about me –{" "}
              I fell in love with design during my childhood, playing on Kid Pix
              on the shared family computer (yes, I do know ball).
            </p>
            <p>
              I&apos;m a huge advocate for designing for lived experiences and
              working with people for people. There&apos;s just something about
              empathy and storytelling that automation can&apos;t replace.
            </p>
            <p>
              I am a continuous learner for life and I love creating tangible
              products for people!
            </p>
          </div>

          <p className="font-geist-mono text-[16px] leading-[1.41] uppercase">
            <span className="text-[var(--colours-surface-surface-200)]">
              HUNGRY FOR MORE?{" "}
            </span>
            <span className="text-[var(--colours-primary-primary-300)]">
              CHECK OUT MY FRIDGE:
            </span>
          </p>
        </div>
      </section>

      {/* ——— Vinyl / Music Section ——— */}
      <section className="relative mt-[100px] pb-[120px]">
        <p className="font-geist-mono mb-[var(--space-5)] text-[16px] leading-[1.41] uppercase text-[var(--colours-surface-surface-150)]">
          {isGirlLikeMe
            ? "CLICK THE VINYL TO PLAY: GIRL LIKE ME"
            : `NOW VIEWING: ${albums[activeIndex].title}`}
        </p>

        <div className="flex flex-col items-start gap-[56px] md:flex-row">
          {/* Vinyl + Needle */}
          <button
            onClick={handleVinylClick}
            aria-label={
              isGirlLikeMe
                ? isPlaying
                  ? "Pause Girl Like Me"
                  : "Play Girl Like Me"
                : albums[activeIndex].title
            }
            className="relative mx-auto h-[650px] w-[650px] shrink-0 cursor-pointer border-none bg-transparent md:mx-0"
          >
            <div
              className={`absolute inset-0 origin-center ${vinylSpinning ? "vinyl-spinning" : ""}`}
              style={!vinylSpinning ? { transform: "rotate(168deg)" } : undefined}
            >
              <Image
                src={IMG_VINYL}
                alt="Vinyl record"
                width={650}
                height={650}
                className="size-full object-cover"
                unoptimized
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
                className="size-full object-contain"
                unoptimized
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
                      className="size-full object-cover"
                      unoptimized
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
                  {albums[activeIndex].title}
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
