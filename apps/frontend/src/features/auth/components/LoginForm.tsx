"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  TrendingUp,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

// ─── Brand / left-panel stats ─────────────────────────────────────────────────

const STATS = [
  { value: "2.4M+", label: "Users" },
  { value: "₹180Cr", label: "Tracked" },
  { value: "4.9★", label: "Rating" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: wire up your auth logic here
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full font-[Roboto,sans-serif] bg-[#0d0f14] dark:bg-[#0d0f14]">
      {/* ── LEFT PANEL ── */}
      <aside
        className="hidden lg:flex w-[420px] shrink-0 flex-col justify-between
                        bg-[#111318] border-r border-[#1e2230]
                        px-10 py-10 relative overflow-hidden"
      >
        {/* decorative circles */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-500/[.07]" />
        <div className="pointer-events-none absolute bottom-16 -left-10 w-44 h-44 rounded-full bg-indigo-500/[.06]" />

        {/* Brand */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-[9px] bg-blue-500 flex items-center justify-center shrink-0">
            <TrendingUp
              className="w-[18px] h-[18px] text-white"
              strokeWidth={2.2}
            />
          </div>
          <div>
            <p className="text-[15px] font-bold text-slate-100 tracking-tight leading-none">
              FinVault
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Personal Finance
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div className="relative z-10">
          <h1 className="text-[26px] font-bold text-slate-100 leading-snug mb-3">
            Your money, <span className="text-blue-400">intelligently</span>{" "}
            managed.
          </h1>
          <p className="text-[13px] text-slate-500 leading-relaxed">
            Track spending, grow savings, and reach your financial goals — all
            in one secure place.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 relative z-10">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="flex-1 bg-[#1a1d26] border border-[#1e2230] rounded-xl p-3"
            >
              <p className="text-[17px] font-bold text-slate-100">{value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-[0.5px]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[340px]">
          {/* Mobile brand */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.2} />
            </div>
            <span className="text-[15px] font-bold text-slate-100">
              FinVault
            </span>
          </div>
          <AnimatedThemeToggler />

          <h2 className="text-[22px] font-bold text-slate-100 mb-1">
            Welcome back
          </h2>
          <p className="text-[13px] text-slate-500 mb-7">
            Sign in to your FinVault account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[12px] font-medium text-slate-400 tracking-[0.3px]"
              >
                Email address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(
                    "h-[42px] bg-[#111318] border-[#1e2230] text-slate-100",
                    "placeholder:text-slate-700 pr-10 rounded-[9px] text-[14px]",
                    "focus-visible:ring-blue-500/40 focus-visible:border-blue-500",
                  )}
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-slate-600 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-[12px] font-medium text-slate-400 tracking-[0.3px]"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cn(
                    "h-[42px] bg-[#111318] border-[#1e2230] text-slate-100",
                    "placeholder:text-slate-700 pr-10 rounded-[9px] text-[14px]",
                    "focus-visible:ring-blue-500/40 focus-visible:border-blue-500",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                  tabIndex={-1}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <EyeOff className="w-[15px] h-[15px]" />
                  ) : (
                    <Eye className="w-[15px] h-[15px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(v) => setRemember(Boolean(v))}
                  className="border-[#2d3245] data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 w-[14px] h-[14px]"
                />
                <label
                  htmlFor="remember"
                  className="text-[12px] text-slate-500 cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-[12px] text-blue-400 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full h-[42px] bg-blue-500 hover:bg-blue-600 text-white rounded-[9px]",
                "text-[14px] font-semibold tracking-[0.2px] transition-all",
                "flex items-center justify-center gap-2",
                loading && "opacity-70 cursor-not-allowed",
              )}
            >
              {loading ? (
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  />
                </svg>
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <Separator className="flex-1 bg-[#1e2230]" />
            <span className="text-[11px] text-slate-600 whitespace-nowrap">
              or continue with
            </span>
            <Separator className="flex-1 bg-[#1e2230]" />
          </div>

          {/* Google SSO */}
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full h-[42px] bg-transparent border-[#1e2230] rounded-[9px]",
              "text-[13px] font-medium text-slate-400 hover:bg-[#111318]",
              "hover:border-[#2d3245] hover:text-slate-200 transition-all flex items-center gap-2",
            )}
          >
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign-up link */}
          <p className="text-center text-[12px] text-slate-500 mt-5">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              Create one free
            </a>
          </p>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-1.5 mt-5 text-[10px] text-slate-600">
            <ShieldCheck className="w-[11px] h-[11px]" />
            256-bit SSL encrypted · SOC 2 certified
          </div>
        </div>
      </main>
    </div>
  );
}
