"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const [manualPlay, setManualPlay] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target || hasEnteredViewport) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEnteredViewport(true);
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasEnteredViewport]);

  const shouldAutoplay = hasEnteredViewport || manualPlay;

  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  const embedUrl = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: shouldAutoplay ? "1" : "0",
      mute: "1",
      loop: "1",
      playlist: videoId,
      playsinline: "1",
      rel: "0",
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }, [videoId, shouldAutoplay]);

  return (
    <div ref={sectionRef} className="space-y-4">
      <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />

        {!shouldAutoplay && (
          <button
            type="button"
            onClick={() => setManualPlay(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
            aria-label="Play video"
          >
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-[hsl(var(--nav-theme))] text-white text-sm font-semibold">
              <Play className="h-4 w-4" />
              Play Video
            </span>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
