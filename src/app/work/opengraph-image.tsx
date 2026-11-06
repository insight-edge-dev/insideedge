import { ogSize, renderOg } from "@/lib/og";

export const alt = "InsideEdge — Work";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Work that moved something.", eyebrow: "Work" });
}
