import { ogSize, renderOg } from "@/lib/og";

export const alt = "InsideEdge — Creative that performs.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "Creative that performs.", eyebrow: "Creative & performance agency" });
}
