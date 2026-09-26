import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

/**
 * Image de partage (Open Graph / X / LinkedIn / WhatsApp), générée au build.
 *
 * Remplace l'icône 192 px utilisée jusqu'ici : déclarée en carte
 * `summary_large_image`, elle était agrandie et floue dans les aperçus.
 * Toutes les pages en héritent, faute d'image propre à leur segment.
 */

export const alt = `${site.name} — ${site.baseline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Plus Jakarta Sans, typographie de la charte. Fichiers .woff (le moteur de
   rendu ne lit pas le woff2), sous-ensemble latin, licence OFL. */
const font = (weight: 400 | 700 | 800) =>
  readFile(
    join(
      process.cwd(),
      `src/assets/fonts/plus-jakarta-sans-latin-${weight}-normal.woff`,
    ),
  );

export default async function Image() {
  const [mark, regular, bold, extraBold] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/mark.png")),
    font(400),
    font(700),
    font(800),
  ]);
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Jakarta",
          background:
            "radial-gradient(circle at 12% 0%, rgba(212,175,55,0.22), transparent 55%), #0b0b0d",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <img src={markSrc} alt="" width={85} height={70} />
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "0.14em",
            }}
          >
            STAR DIGI&nbsp;<span style={{ color: "#d4af37" }}>PRO</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
            }}
          >
            <span>De la première vue</span>
            <span style={{ display: "flex" }}>
              à la&nbsp;<span style={{ color: "#d4af37" }}>première vente.</span>
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#9aa0aa" }}>
            {site.domaines.join(" · ")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #d4af37 22%, #d4af37 78%, transparent)",
            opacity: 0.6,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Jakarta", data: regular, weight: 400, style: "normal" },
        { name: "Jakarta", data: bold, weight: 700, style: "normal" },
        { name: "Jakarta", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
