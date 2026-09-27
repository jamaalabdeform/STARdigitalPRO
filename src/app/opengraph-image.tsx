import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

/**
 * Image de partage (Open Graph / X / LinkedIn / WhatsApp), générée au build.
 * Une photo forte en couleur (le business), le logo en noir et blanc (la
 * marque) — les aperçus sociaux peuvent être plus colorés que le site.
 * Toutes les pages en héritent, faute d'image propre à leur segment.
 */

export const alt = `${site.name} — ${site.baseline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Inter, typographie de la charte. Fichiers .woff (le moteur de rendu ne lit
   pas le woff2), sous-ensemble latin, licence OFL. */
const font = (weight: 400 | 600) =>
  readFile(
    join(process.cwd(), `src/assets/fonts/inter-latin-${weight}-normal.woff`),
  );

export default async function Image() {
  const [regular, semibold, fond] = await Promise.all([
    font(400),
    font(600),
    readFile(join(process.cwd(), "src/assets/og-fond.jpg")),
  ]);
  const fondSrc = `data:image/jpeg;base64,${fond.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "76px 84px",
        fontFamily: "Inter",
        background: "#050505",
        color: "#F4F3EF",
        position: "relative",
      }}
    >
      <img
        src={fondSrc}
        alt=""
        width={1200}
        height={630}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.94) 0%, rgba(5,5,5,0.82) 45%, rgba(5,5,5,0.15) 100%)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="54" height="36" viewBox="0 0 48 32">
          <path d="M3 24 12 8h11l-9 16H3Z" fill="#F4F3EF" />
          <path d="M18 24 27 8h15l-9 16H18Z" fill="#F4F3EF" />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          STAR DIGI&nbsp;<span style={{ fontWeight: 400 }}>PRO</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 92,
          fontWeight: 600,
          lineHeight: 0.98,
          letterSpacing: "-0.05em",
        }}
      >
        <span>De la première vue</span>
        <span style={{ color: "#B7B7B7" }}>à la première vente.</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(244,243,239,0.18)",
          paddingTop: 26,
          fontSize: 24,
          color: "#C9C9C9",
        }}
      >
        <span>Communication. Design. Digital. Automatisation.</span>
        <span>{site.domain}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
