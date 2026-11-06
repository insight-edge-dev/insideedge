"use client";

import { Play } from "lucide-react";
import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster?: string;
  title: string;
  className?: string;
};

/**
 * Click-to-play video: nothing downloads until the visitor asks (preload="none"),
 * so a heavy showreel never slows the page. Tracks start / 50% / complete.
 */
export function VideoPlayer({ src, poster, title, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const fired = useRef({ start: false, half: false });
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    void ref.current?.play();
  };

  const onTime = () => {
    const v = ref.current;
    if (!v?.duration) return;
    if (!fired.current.half && v.currentTime / v.duration >= 0.5) {
      fired.current.half = true;
      track("video_50", { video: title });
    }
  };

  return (
    <div className={cn("relative overflow-hidden rounded-card bg-ink", className)}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={playing}
        className="aspect-video h-full w-full object-cover"
        aria-label={title}
        onPlay={() => {
          if (!fired.current.start) {
            fired.current.start = true;
            track("video_start", { video: title });
          }
        }}
        onTimeUpdate={onTime}
        onEnded={() => track("video_complete", { video: title })}
      />
      {!playing && (
        <button
          type="button"
          onClick={play}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label={`Play ${title}`}
        >
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-edge text-ink transition-transform duration-(--duration-base) ease-edge group-hover:scale-110">
            <Play aria-hidden className="ml-1 h-9 w-9" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
