import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const logoSrc = `data:image/png;base64,${await readFile(join(process.cwd(), "public/logo-mark.png"), "base64")}`;

export const alt = "WebPoint – Plný kalendár. Každý týždeň.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 20% 0%, #5a3014 0%, #0c1320 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34, fontWeight: 800, letterSpacing: 7 }}>
          <img src={logoSrc} height={60} width={90} alt="" />
          <span>WEBPOINT</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
          <span>Plný kalendár.</span>
          <span style={{ color: "#f97a1f" }}>Každý týždeň.</span>
        </div>
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.65)" }}>
          Reklamy · Web na mieru · CRM a automatické e-maily · Organický obsah
        </div>
      </div>
    ),
    size,
  );
}
