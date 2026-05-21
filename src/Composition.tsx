import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const features = ["Quick", "Study", "Page", "YouTube", "Files"];

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });

  const zoom = interpolate(frame, [0, 450], [1, 1.08]);
  const appY = interpolate(frame, [0, 35], [120, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene = frame < 120 ? 0 : frame < 250 ? 1 : frame < 360 ? 2 : 3;

  const caption =
    scene === 0
      ? "Students are hiding this AI extension 👀"
      : scene === 1
      ? "Summarize pages, YouTube and notes"
      : scene === 2
      ? "Get answers directly inside Chrome"
      : "Try Instant Answer today 🚀";

  const typingWidth = interpolate(frame, [155, 230], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaScale = spring({
    frame: frame - 360,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at top left, #1d2b0b 0%, #050505 42%, #000 100%)",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "rgba(190,255,80,.18)",
          filter: "blur(150px)",
          top: -300,
          left: -260,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "rgba(255,255,255,.06)",
          filter: "blur(120px)",
          bottom: -250,
          right: -180,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 90,
          left: 70,
          right: 70,
          color: "white",
          fontSize: 42,
          fontWeight: 900,
          textAlign: "center",
          padding: "24px 30px",
          borderRadius: 28,
          background: "rgba(0,0,0,.45)",
          border: "1px solid rgba(255,255,255,.12)",
          textShadow: "0 6px 25px rgba(0,0,0,.7)",
        }}
      >
        {caption}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${intro * zoom}) translateY(${appY}px)`,
        }}
      >
        <div
          style={{
            width: 900,
            minHeight: 1180,
            borderRadius: 46,
            padding: 44,
            background: "rgba(12,12,12,.96)",
            border: "1px solid rgba(255,255,255,.12)",
            boxShadow: "0 35px 120px rgba(0,0,0,.65)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 36,
            }}
          >
            <div style={{ fontSize: 34, fontWeight: 900, color: "white" }}>
              Instant <span style={{ color: "#baff4a" }}>Answer</span>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {["History", "Clear"].map((x) => (
                <div
                  key={x}
                  style={{
                    padding: "16px 24px",
                    borderRadius: 24,
                    background: "#1f1f1f",
                    color: "white",
                    fontSize: 22,
                    fontWeight: 800,
                    border: "1px solid rgba(255,255,255,.12)",
                  }}
                >
                  {x}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              color: "white",
              fontSize: 82,
              fontWeight: 950,
              lineHeight: 0.86,
              letterSpacing: -4,
            }}
          >
            Fast AI
            <br />
            <span style={{ color: "#baff4a" }}>for work</span>
          </div>

          <div
            style={{
              marginTop: 24,
              color: "#d4d4d8",
              fontSize: 28,
              lineHeight: 1.25,
              fontWeight: 600,
            }}
          >
            Quick answers, study notes, page reading, YouTube summaries and
            file analysis.
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 34,
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderRadius: 999,
                background: "#baff4a",
                color: "#000",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              Pro
            </div>
            <div
              style={{
                flex: 1,
                padding: "20px 26px",
                borderRadius: 999,
                background: "#202020",
                color: "#cbd5e1",
                fontSize: 24,
                fontWeight: 800,
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              Ready
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 28,
              flexWrap: "wrap",
            }}
          >
            {features.map((x, i) => (
              <div
                key={x}
                style={{
                  padding: "18px 26px",
                  borderRadius: 24,
                  background: i === scene + 1 ? "#baff4a" : "#1f1f1f",
                  color: i === scene + 1 ? "#000" : "#d1d5db",
                  fontSize: 24,
                  fontWeight: 900,
                  border: "1px solid rgba(255,255,255,.12)",
                }}
              >
                {x}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 36,
              padding: 34,
              borderRadius: 38,
              background: "linear-gradient(180deg,#181818,#101010)",
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            <div style={{ color: "white", fontSize: 44, fontWeight: 950 }}>
              {scene === 0
                ? "Quick Mode"
                : scene === 1
                ? "Study Result"
                : scene === 2
                ? "Page Mode"
                : "Instant Answer AI"}
            </div>

            <div
              style={{
                marginTop: 16,
                color: "#cbd5e1",
                fontSize: 28,
                lineHeight: 1.35,
                fontWeight: 600,
              }}
            >
              {scene === 0
                ? "Fast answers with simple wording."
                : scene === 1
                ? "Football is a team sport played between two teams. The AI explains it clearly and simply."
                : scene === 2
                ? "Read any webpage and get the important points instantly."
                : "Built for students, creators and people who work online."}
            </div>

            <div
              style={{
                marginTop: 34,
                height: 230,
                borderRadius: 30,
                background: "#232323",
                border: "1px solid rgba(255,255,255,.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#cbd5e1",
                fontSize: 30,
                fontWeight: 700,
                padding: 30,
                textAlign: "center",
              }}
            >
              {scene === 1 ? (
                <div>
                  AI is writing answer
                  <div
                    style={{
                      marginTop: 18,
                      width: `${typingWidth}%`,
                      height: 12,
                      borderRadius: 999,
                      background: "#baff4a",
                    }}
                  />
                </div>
              ) : (
                "Ask anything..."
              )}
            </div>

            <div style={{ display: "flex", gap: 18, marginTop: 30 }}>
              <div
                style={{
                  flex: 1,
                  padding: "24px 20px",
                  borderRadius: 28,
                  background: "#baff4a",
                  color: "#000",
                  fontSize: 28,
                  fontWeight: 950,
                  textAlign: "center",
                }}
              >
                Quick answer
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "24px 20px",
                  borderRadius: 28,
                  background: "#222",
                  color: "white",
                  fontSize: 28,
                  fontWeight: 950,
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,.1)",
                }}
              >
                Read page
              </div>
            </div>
          </div>
        </div>
      </div>

      {frame > 360 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,.72)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              transform: `scale(${ctaScale})`,
              textAlign: "center",
              color: "white",
            }}
          >
            <div
              style={{
                fontSize: 86,
                fontWeight: 950,
                lineHeight: 0.95,
              }}
            >
              Try Instant
              <br />
              <span style={{ color: "#baff4a" }}>Answer today</span>
            </div>
            <div
              style={{
                marginTop: 30,
                fontSize: 34,
                color: "#d1d5db",
                fontWeight: 700,
              }}
            >
              Study smarter. Work faster.
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          bottom: 60,
          height: 10,
          borderRadius: 999,
          background: "rgba(255,255,255,.14)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / 450) * 100}%`,
            background: "#baff4a",
            boxShadow: "0 0 30px rgba(186,255,74,.8)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};