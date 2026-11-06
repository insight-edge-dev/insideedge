import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Branded share image: black field, yellow edge, InsideEdge logo, page title. */
export async function renderOg({ title, eyebrow }: { title: string; eyebrow?: string }) {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-light.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const size = title.length > 60 ? 60 : title.length > 36 ? 72 : 88;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0a0a0a", padding: "64px 72px", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 16, background: "#f0bf25" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={logoSrc} width={192} height={83} />
          <div style={{ color: "#a6a59d", fontSize: 24, letterSpacing: 3, textTransform: "uppercase" }}>{eyebrow ?? "Guwahati · Assam"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#fafaf7", fontSize: size, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          <div style={{ marginTop: 32, height: 10, width: 180, background: "#f0bf25" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
