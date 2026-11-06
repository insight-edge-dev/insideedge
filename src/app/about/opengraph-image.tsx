import { ogSize, renderOg } from "@/lib/og";

export const alt = "InsideEdge — About";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "An agency built on the inside edge.", eyebrow: "About" });
}
