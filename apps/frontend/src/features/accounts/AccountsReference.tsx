import type { Account, AccountType } from "@budget/contracts";
import { useState } from "react";
import type { CSSProperties } from "react";

// ─── Per-type theme config ────────────────────────────────────────────────────

interface CardTheme {
  background: string;
  // boxShadow: string;
  topStripe: string;
  chipBg?: string;
  accentColor: string;
  accentAlpha: string;
  accentBorder: string;
  maskedColor: string;
  glowA: { color: string; w: number; h: number; top: number; right: number };
  glowB: { color: string; w: number; h: number; bottom: number; left: number };
  showChip: boolean;
  showAccNumber: boolean;
}

const THEMES: Record<AccountType, CardTheme> = {
  BANK: {
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    // boxShadow:
    //   "0 22px 55px rgba(48,43,99,0.55), 0 6px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12)",
    topStripe:
      "linear-gradient(90deg, transparent, rgba(99,179,237,0.55), rgba(180,130,255,0.4), transparent)",
    chipBg: "linear-gradient(135deg, #d4a84b, #f0c96a, #c89b38, #e8b84e)",
    accentColor: "rgba(99,179,237,0.88)",
    accentAlpha: "rgba(99,179,237,0.13)",
    accentBorder: "rgba(99,179,237,0.28)",
    maskedColor: "rgba(255,255,255,0.35)",
    glowA: {
      color: "rgba(99,179,237,0.18)",
      w: 240,
      h: 240,
      top: -80,
      right: -50,
    },
    glowB: {
      color: "rgba(180,130,255,0.12)",
      w: 180,
      h: 180,
      bottom: -60,
      left: -30,
    },
    showChip: true,
    showAccNumber: true,
  },
  CREDIT_CARD: {
    background: "linear-gradient(160deg, #1c1c1c 0%, #2d2d2d 45%, #111 100%)",
    // boxShadow:
    //   "0 22px 55px rgba(0,0,0,0.65), 0 6px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,215,80,0.18)",
    topStripe:
      "linear-gradient(90deg, transparent, rgba(255,215,80,0.5), rgba(255,180,0,0.35), transparent)",
    chipBg: "linear-gradient(135deg, #b8860b, #ffd700, #b8860b, #ffd700)",
    accentColor: "rgba(255,215,80,0.9)",
    accentAlpha: "rgba(255,215,80,0.12)",
    accentBorder: "rgba(255,215,80,0.28)",
    maskedColor: "rgba(255,215,80,0.28)",
    glowA: {
      color: "rgba(255,215,80,0.14)",
      w: 220,
      h: 220,
      top: -70,
      right: -40,
    },
    glowB: {
      color: "rgba(255,130,0,0.1)",
      w: 160,
      h: 160,
      bottom: -50,
      left: -20,
    },
    showChip: true,
    showAccNumber: true,
  },
  CASH: {
    background:
      "linear-gradient(135deg, #1a3a2a 0%, #0d4f2e 50%, #1a3a2a 100%)",
    // boxShadow:
    //   "0 22px 55px rgba(13,79,46,0.5), 0 6px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(134,239,172,0.14)",
    topStripe:
      "linear-gradient(90deg, transparent, rgba(134,239,172,0.5), rgba(52,211,153,0.4), transparent)",
    accentColor: "rgba(134,239,172,0.88)",
    accentAlpha: "rgba(134,239,172,0.13)",
    accentBorder: "rgba(134,239,172,0.28)",
    maskedColor: "transparent",
    glowA: {
      color: "rgba(52,211,153,0.2)",
      w: 220,
      h: 220,
      top: -70,
      right: -40,
    },
    glowB: {
      color: "rgba(134,239,172,0.1)",
      w: 160,
      h: 160,
      bottom: -50,
      left: -20,
    },
    showChip: false,
    showAccNumber: false,
  },
  WALLET: {
    background:
      "linear-gradient(135deg, #2d1b4e 0%, #3d2060 45%, #1e1035 100%)",
    // boxShadow:
    //   "0 22px 55px rgba(45,27,78,0.55), 0 6px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(196,130,255,0.15)",
    topStripe:
      "linear-gradient(90deg, transparent, rgba(196,130,255,0.5), rgba(139,92,246,0.4), transparent)",
    accentColor: "rgba(196,130,255,0.88)",
    accentAlpha: "rgba(196,130,255,0.13)",
    accentBorder: "rgba(196,130,255,0.28)",
    maskedColor: "transparent",
    glowA: {
      color: "rgba(196,130,255,0.18)",
      w: 220,
      h: 220,
      top: -70,
      right: -40,
    },
    glowB: {
      color: "rgba(139,92,246,0.12)",
      w: 160,
      h: 160,
      bottom: -50,
      left: -20,
    },
    showChip: false,
    showAccNumber: false,
  },
};

const TYPE_LABEL: Record<AccountType, string> = {
  BANK: "Bank Account",
  CREDIT_CARD: "Credit Card",
  CASH: "Cash",
  WALLET: "Wallet",
};

// ─── Bottom-right icon per type ───────────────────────────────────────────────

function BottomIcon({ type, theme }: { type: AccountType; theme: CardTheme }) {
  if (type === "BANK" || type === "CREDIT_CARD") {
    const circleA = type === "BANK" ? "#e84141" : "#c0c0c0";
    const circleB = type === "BANK" ? "#f79f1f" : "#e8e8e8";
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: circleA,
            opacity: 0.87,
            marginRight: -8,
          }}
        />
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: circleB,
            opacity: 0.87,
          }}
        />
      </div>
    );
  }
  if (type === "CASH") {
    return (
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: theme.accentAlpha,
          border: `0.5px solid ${theme.accentBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: theme.accentColor,
        }}
      >
        ₹
      </div>
    );
  }
  // WALLET
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke={theme.accentColor}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <circle cx="16" cy="14" r="1" fill={theme.accentColor} stroke="none" />
    </svg>
  );
}

// ─── Single card ──────────────────────────────────────────────────────────────

function ATMCard({ account }: { account: Account }) {
  const theme = THEMES[account.type];
  const [revealed, setRevealed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const accGroups: string[] = account.accNumber
    ? (account.accNumber.replace(/\s/g, "").match(/.{1,4}/g) ?? [])
    : [];

  const cardTransform = tilt.active
    ? `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.04)`
    : "rotateY(-3deg) rotateX(2deg)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 16,
      y: -((e.clientY - r.top) / r.height - 0.5) * 12,
      active: true,
    });
  };

  return (
    <div>
      {/* ── Card ── */}
      <div
        style={{ perspective: 1200, height: 200 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0, active: false })}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
            position: "relative",
            overflow: "hidden",
            background: theme.background,
            // boxShadow: theme.boxShadow,
            transform: cardTransform,
            transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1)",
            cursor: "pointer",
          }}
        >
          {/* Rainbow top stripe */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: theme.topStripe,
            }}
          />

          {/* Glow A */}
          <div
            style={{
              position: "absolute",
              borderRadius: "50%",
              pointerEvents: "none",
              background: `radial-gradient(circle, ${theme.glowA.color} 0%, transparent 70%)`,
              width: theme.glowA.w,
              height: theme.glowA.h,
              top: theme.glowA.top,
              right: theme.glowA.right,
            }}
          />
          {/* Glow B */}
          <div
            style={{
              position: "absolute",
              borderRadius: "50%",
              pointerEvents: "none",
              background: `radial-gradient(circle, ${theme.glowB.color} 0%, transparent 70%)`,
              width: theme.glowB.w,
              height: theme.glowB.h,
              bottom: theme.glowB.bottom,
              left: theme.glowB.left,
            }}
          />

          {/* Inner layout */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "18px 22px 16px",
            }}
          >
            {/* Top: name + chip */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#fff",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {account.name}
                </div>
                <span
                  style={
                    {
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: 4,
                      display: "inline-block",
                      marginTop: 4,
                      background: theme.accentAlpha,
                      color: theme.accentColor,
                      border: `0.5px solid ${theme.accentBorder}`,
                    } as CSSProperties
                  }
                >
                  {TYPE_LABEL[account.type]}
                </span>
              </div>
              {theme.showChip && (
                <div
                  style={{
                    width: 38,
                    height: 28,
                    borderRadius: 5,
                    background: theme.chipBg,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
                    position: "relative",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: 1,
                      background: "rgba(0,0,0,0.25)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      bottom: 0,
                      width: 1,
                      background: "rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Mid: account number */}
            {theme.showAccNumber && accGroups.length > 0 && (
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: 15,
                  letterSpacing: "2.5px",
                  display: "flex",
                  gap: 14,
                }}
              >
                {accGroups.map((g, i) => {
                  const isLast = i === accGroups.length - 1;
                  const show = isLast || revealed;
                  return (
                    <span
                      key={i}
                      style={{
                        color: show
                          ? "rgba(255,255,255,0.88)"
                          : theme.maskedColor,
                        letterSpacing: show ? "2.5px" : "4px",
                        transition: "color 0.3s",
                      }}
                    >
                      {show ? g : "••••"}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Bottom: holder + icon */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 8,
                    letterSpacing: "2px",
                    color: "rgba(255,255,255,0.38)",
                    textTransform: "uppercase",
                    marginBottom: 3,
                  }}
                >
                  Currency
                </div>
                <div
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {account.currency}
                </div>
              </div>
              <BottomIcon type={account.type} theme={theme} />
            </div>
          </div>
        </div>
      </div>

      {/* Reveal toggle */}
      {theme.showAccNumber && account.accNumber && (
        <button
          onClick={() => setRevealed((v) => !v)}
          style={{
            background: "none",
            border:
              "0.5px solid var(--color-border-secondary, rgba(128,128,128,0.3))",
            borderRadius: 8,
            padding: "5px 14px",
            fontSize: 12,
            color: "var(--color-text-secondary, #888)",
            cursor: "pointer",
            display: "block",
            margin: "10px auto 0",
          }}
        >
          {revealed ? "Hide number" : "Reveal number"}
        </button>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountsRef() {
  const [accounts] = useState<Account[]>([
    {
      id: "1",
      accNumber: "301235456412",
      name: "SBI",
      type: "BANK",
      currency: "INR",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "2",
      accNumber: "547832109876",
      name: "HDFC",
      type: "CREDIT_CARD",
      currency: "INR",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      name: "Cash",
      type: "CASH",
      currency: "INR",
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "4",
      name: "GPay",
      type: "WALLET",
      currency: "INR",
      createdAt: "",
      updatedAt: "",
    },
  ]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 20,
        padding: "1rem",
      }}
    >
      {accounts.map((account) => (
        <ATMCard key={account.id} account={account} />
      ))}
    </div>
  );
}
