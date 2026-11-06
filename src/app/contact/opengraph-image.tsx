import { ogSize, renderOg } from "@/lib/og";

export const alt = "InsideEdge — Contact";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Tell us what you’re working on.", eyebrow: "Contact" });
}
