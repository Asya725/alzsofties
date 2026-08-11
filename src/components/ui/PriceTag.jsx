import { theme as C } from "../../constants/theme";

export default function PriceTag({ percent, size = "md" }) {
  const dims =
    size === "lg" ? { w: 92, h: 48, fs: 18 } : { w: 66, h: 34, fs: 12 };
  return (
    <div
      className="inline-flex items-center justify-center gap-1 relative shrink-0"
      style={{
        width: dims.w,
        height: dims.h,
        background: C.accent,
        color: "#fff",
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 500,
        fontSize: dims.fs,
        clipPath: "polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)",
        paddingLeft: 10,
      }}
    >
      <span
        className="rounded-full absolute"
        style={{
          left: 4,
          top: "50%",
          transform: "translateY(-50%)",
          width: 5,
          height: 5,
          background: "rgba(255,255,255,0.85)",
        }}
      />
      -{percent}%
    </div>
  );
}
