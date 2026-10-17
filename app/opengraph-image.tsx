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
          background: "#4f46e5",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85 }}>CV Maker Pakistan</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginTop: 16 }}>
          Free Online Resume Builder
        </div>
        <div style={{ fontSize: 28, marginTop: 16, opacity: 0.9 }}>
          ATS-friendly CV • No sign-up • Print to PDF
        </div>
      </div>
    ),
    { ...size }
  );
}
