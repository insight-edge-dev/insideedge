import { ogSize, renderOg } from "@/lib/og";

export const alt = "InsideEdge — Free growth audit";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Find out what’s holding your growth back.", eyebrow: "Free growth audit" });
}
