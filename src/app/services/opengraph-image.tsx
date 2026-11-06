import { ogSize, renderOg } from "@/lib/og";

export const alt = "InsideEdge — Services";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "One team. Every lever of growth.", eyebrow: "Services" });
}
