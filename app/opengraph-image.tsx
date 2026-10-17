import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          backgroundImage: "linear-gradient(135deg, #059669 0%, #4f46e5 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo row — Navbar/Footer jaisa CV badge + naam */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              borderRadius: 20,
              background: "#ffffff",
              color: "#4f46e5",
              fontSize: 36,
              fontWeight: 900,
            }}
          >
            CV
          </div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>
            CV Maker <span style={{ color: "#6ee7b7" }}>Pakistan</span>
          </div>
        </div>

        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginTop: 28 }}>
          Free Online Resume Builder
        </div>
        <div style={{ fontSize: 28, marginTop: 16, opacity: 0.9 }}>
          Pakistan + 16 More Countries • ATS-friendly CV • No sign-up • Print to PDF
        </div>
      </div>
    ),
    { ...size }
  );
}
