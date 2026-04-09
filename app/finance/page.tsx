"use client";

import { useState, useEffect } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type SubItem = {
  id: string;
  name: string;
  balance: number;
  icon: string;
  description: string;
};

type Account = {
  id: string;
  name: string;
  balance: number;
  currency: string;
  category: "digital" | "savings" | "cash" | "crypto" | "commodity" | "bank";
  description: string;
  icon: string;
  color: string;
  breakdown?: SubItem[];
};

type SpendCategory =
  | "food" | "transport" | "going-out" | "shopping"
  | "health" | "bills" | "entertainment" | "other";

type SpendEntry = {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: SpendCategory;
};

type FixedExpense = {
  id: string;
  name: string;
  amount: number;
  icon: string;
};

type MonthSnapshot = {
  month: string;       // "2026-04"
  label: string;       // "April 2026"
  budget: number;
  totalFixed: number;
  totalSpent: number;
  categories: Record<string, number>;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const SPEND_CATEGORIES: Record<SpendCategory, { label: string; icon: string; color: string }> = {
  food:          { label: "Food",          icon: "🍔", color: "#f59e0b" },
  transport:     { label: "Transport",     icon: "🚗", color: "#3b82f6" },
  "going-out":   { label: "Going Out",     icon: "🎉", color: "#8b5cf6" },
  shopping:      { label: "Shopping",      icon: "🛍️", color: "#ec4899" },
  health:        { label: "Health",        icon: "💊", color: "#10b981" },
  bills:         { label: "Bills",         icon: "⚡", color: "#f97316" },
  entertainment: { label: "Entertainment", icon: "🎮", color: "#06b6d4" },
  other:         { label: "Other",         icon: "📦", color: "#6b7280" },
};

const defaultAccounts: Account[] = [
  {
    id: "revolut",
    name: "Revolut",
    balance: 4725,
    currency: "EUR",
    category: "digital",
    description: "Digital bank — total across all pockets",
    icon: "💳",
    color: "#6366f1",
    breakdown: [
      { id: "savings", name: "Savings & Funds", balance: 1007, icon: "🏦", description: "Emergency fund & long-term savings" },
      { id: "cash",    name: "Cash",            balance: 590,  icon: "💶", description: "Physical cash on hand" },
      { id: "crypto",  name: "Crypto",          balance: 547,  icon: "₿",  description: "Cryptocurrency holdings" },
      { id: "silver",  name: "Silver",          balance: 233,  icon: "🥈", description: "Physical silver investment" },
    ],
  },
  {
    id: "wise",
    name: "Wise",
    balance: 2781,
    currency: "EUR",
    category: "digital",
    description: "International transfers & EUR account",
    icon: "🌍",
    color: "#10b981",
  },
  {
    id: "banco-ctt",
    name: "Banco CTT",
    balance: 30,
    currency: "EUR",
    category: "bank",
    description: "Portuguese bank account",
    icon: "🏛️",
    color: "#ec4899",
  },
];

const defaultFixedExpenses: FixedExpense[] = [
  { id: "fixed-1", name: "Monthly Fixed", amount: 200, icon: "📋" },
];

const categoryLabel: Record<Account["category"], string> = {
  digital: "Digital Bank", savings: "Savings", cash: "Cash",
  crypto: "Crypto", commodity: "Commodity", bank: "Traditional Bank",
};

function formatEUR(amount: number) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency", currency: "EUR", minimumFractionDigits: 2,
  }).format(amount);
}

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

// ── PIN Gate ──────────────────────────────────────────────────────────────────

const CORRECT_PIN = "1234";

function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin]       = useState("");
  const [shake, setShake]   = useState(false);
  const [success, setSuccess] = useState(false);

  function press(digit: string) {
    if (pin.length >= 4) return;
    const next = pin + digit;
    setPin(next);
    if (next.length === 4) {
      if (next === CORRECT_PIN) {
        setSuccess(true);
        setTimeout(onUnlock, 400);
      } else {
        setShake(true);
        setTimeout(() => { setPin(""); setShake(false); }, 600);
      }
    }
  }

  function del() { setPin((p) => p.slice(0, -1)); }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-10 px-6">
      <div className="text-center">
        <p className="text-white/20 text-xs uppercase tracking-widest mb-2">wertical / finance</p>
        <h1 className="text-white/70 text-xl font-semibold">Enter access code</h1>
      </div>

      {/* Dots */}
      <div
        className="flex gap-4"
        style={{ animation: shake ? "shake 0.5s ease" : success ? "none" : "none" }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full border-2 transition-all duration-150"
            style={{
              borderColor: shake ? "#f87171" : success ? "#34d399" : "rgba(255,255,255,0.25)",
              background: pin.length > i
                ? (shake ? "#f87171" : success ? "#34d399" : "white")
                : "transparent",
            }}
          />
        ))}
      </div>

      {/* Numpad */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((k, i) => (
          k === "" ? <div key={i} /> :
          <button
            key={i}
            onClick={() => k === "⌫" ? del() : press(k)}
            className="aspect-square rounded-2xl text-white/70 text-xl font-medium transition-all active:scale-95"
            style={{ background: k === "⌫" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)" }}
          >
            {k}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-6px); }
          80%      { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function FinancePage() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("finance-unlocked") === "1") setUnlocked(true);
  }, []);

  function handleUnlock() {
    sessionStorage.setItem("finance-unlocked", "1");
    setUnlocked(true);
  }

  if (!unlocked) return <PinGate onUnlock={handleUnlock} />;
  return <FinanceDashboard />;
}

function FinanceDashboard() {
  // Accounts
  const [accounts, setAccounts]   = useState<Account[]>(defaultAccounts);
  const [selected, setSelected]   = useState<Account | null>(null);
  const [editing, setEditing]     = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editDesc, setEditDesc]   = useState("");
  const [saved, setSaved]         = useState(false);

  // Budget & spends
  const [budget, setBudget]               = useState<number>(700);
  const [spends, setSpends]               = useState<SpendEntry[]>([]);
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput]     = useState("");
  const [showAddSpend, setShowAddSpend]   = useState(false);
  const [spendName, setSpendName]         = useState("");
  const [spendAmount, setSpendAmount]     = useState("");
  const [spendCat, setSpendCat]           = useState<SpendCategory>("other");
  const [filterCat, setFilterCat]         = useState<SpendCategory | "all">("all");

  // Monthly stats
  const [monthlyStats, setMonthlyStats]     = useState<MonthSnapshot[]>([]);
  const [selectedMonth, setSelectedMonth]   = useState<string | null>(null);

  // Fixed expenses
  const [fixedExpenses, setFixedExpenses]   = useState<FixedExpense[]>(defaultFixedExpenses);
  const [showFixedPanel, setShowFixedPanel] = useState(false);
  const [showAddFixed, setShowAddFixed]     = useState(false);
  const [fixedName, setFixedName]           = useState("");
  const [fixedAmount, setFixedAmount]       = useState("");
  const [editingFixed, setEditingFixed]     = useState<string | null>(null);
  const [editFixedVal, setEditFixedVal]     = useState("");

  // ── Load from localStorage ────────────────────────────────────────────────
  useEffect(() => {
    const stored  = localStorage.getItem("wertical-finance");
    const version = localStorage.getItem("wertical-finance-version");
    if (stored && version === "2") {
      try { setAccounts(JSON.parse(stored)); } catch {}
    } else {
      localStorage.removeItem("wertical-finance");
      localStorage.setItem("wertical-finance-version", "2");
    }

    const storedBudget = localStorage.getItem("wertical-budget");
    if (storedBudget) setBudget(parseFloat(storedBudget));

    const storedMonth = localStorage.getItem("wertical-spend-month");
    const thisMonth   = currentMonth();

    // Load fixed first so snapshot has correct value
    const storedFixed = localStorage.getItem("wertical-fixed");
    let loadedFixed: FixedExpense[] = defaultFixedExpenses;
    if (storedFixed) { try { loadedFixed = JSON.parse(storedFixed); setFixedExpenses(loadedFixed); } catch {} }

    const storedBudgetVal = parseFloat(localStorage.getItem("wertical-budget") || "700");

    if (storedMonth && storedMonth !== thisMonth) {
      // Month rolled over — snapshot the previous month before clearing
      const prevSpends: SpendEntry[] = (() => {
        try { return JSON.parse(localStorage.getItem("wertical-spends") || "[]"); } catch { return []; }
      })();
      const prevFixed  = loadedFixed.reduce((s, f) => s + f.amount, 0);
      const prevSpent  = prevSpends.reduce((s, e) => s + e.amount, 0);
      const catBreakdown = prevSpends.reduce<Record<string, number>>((acc, s) => {
        acc[s.category] = (acc[s.category] || 0) + s.amount;
        return acc;
      }, {});
      const [year, mon] = storedMonth.split("-");
      const label = new Date(parseInt(year), parseInt(mon) - 1, 1)
        .toLocaleDateString("en-GB", { month: "long", year: "numeric" });
      const snapshot: MonthSnapshot = {
        month: storedMonth, label,
        budget: storedBudgetVal,
        totalFixed: prevFixed,
        totalSpent: prevSpent,
        categories: catBreakdown,
      };
      const existingStats: MonthSnapshot[] = (() => {
        try { return JSON.parse(localStorage.getItem("wertical-monthly-stats") || "[]"); } catch { return []; }
      })();
      const updatedStats = [snapshot, ...existingStats.filter((s) => s.month !== storedMonth)];
      localStorage.setItem("wertical-monthly-stats", JSON.stringify(updatedStats));
      setMonthlyStats(updatedStats);
      localStorage.setItem("wertical-spend-month", thisMonth);
      localStorage.removeItem("wertical-spends");
    } else {
      if (!storedMonth) localStorage.setItem("wertical-spend-month", thisMonth);
      const storedSpends = localStorage.getItem("wertical-spends");
      if (storedSpends) { try { setSpends(JSON.parse(storedSpends)); } catch {} }
      // Load existing stats
      const storedStats = localStorage.getItem("wertical-monthly-stats");
      if (storedStats) { try { setMonthlyStats(JSON.parse(storedStats)); } catch {} }
    }
  }, []);

  // ── Persist ───────────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("wertical-finance", JSON.stringify(accounts));
    localStorage.setItem("wertical-finance-version", "2");
  }, [accounts]);
  useEffect(() => { localStorage.setItem("wertical-budget", String(budget)); }, [budget]);
  useEffect(() => { localStorage.setItem("wertical-spends", JSON.stringify(spends)); }, [spends]);
  useEffect(() => { localStorage.setItem("wertical-fixed", JSON.stringify(fixedExpenses)); }, [fixedExpenses]);
  useEffect(() => { localStorage.setItem("wertical-monthly-stats", JSON.stringify(monthlyStats)); }, [monthlyStats]);

  // ── Derived values ────────────────────────────────────────────────────────
  const accountsTotal  = accounts.reduce((s, a) => s + a.balance, 0);
  const totalFixed     = fixedExpenses.reduce((s, f) => s + f.amount, 0);
  const totalSpent     = spends.reduce((s, e) => s + e.amount, 0);
  const totalOutgoing  = totalFixed + totalSpent;           // fixed + discretionary
  const freeToSpend    = budget - totalFixed - totalSpent;  // what's left this month
  const fixedPct       = budget > 0 ? Math.min((totalFixed / budget) * 100, 100) : 0;
  const spentPct       = budget > 0 ? Math.min((totalSpent / budget) * 100, 100 - fixedPct) : 0;
  const realWealth     = accountsTotal - totalOutgoing;     // accounts minus all outgoings

  const filteredSpends = filterCat === "all" ? spends : spends.filter((s) => s.category === filterCat);

  const categoryTotals = Object.entries(
    spends.reduce<Record<string, number>>((acc, s) => {
      acc[s.category] = (acc[s.category] || 0) + s.amount;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  const groupedByCategory = accounts.reduce<Record<string, Account[]>>((acc, a) => {
    if (!acc[a.category]) acc[a.category] = [];
    acc[a.category].push(a);
    return acc;
  }, {});

  const accountCategoryTotals = Object.entries(groupedByCategory).map(([cat, accs]) => ({
    category: cat as Account["category"],
    total: accs.reduce((s, a) => s + a.balance, 0),
    color: accs[0].color,
  }));

  // ── Handlers ─────────────────────────────────────────────────────────────
  function openAccount(account: Account) {
    setSelected(account); setEditing(false);
    setEditValue(String(account.balance)); setEditDesc(account.description);
  }
  function closeModal() { setSelected(null); setEditing(false); }

  function saveEdit() {
    if (!selected) return;
    const v = parseFloat(editValue);
    if (isNaN(v)) return;
    const updated = accounts.map((a) => a.id === selected.id ? { ...a, balance: v, description: editDesc } : a);
    setAccounts(updated);
    setSelected({ ...selected, balance: v, description: editDesc });
    setEditing(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function saveBudget() {
    const v = parseFloat(budgetInput);
    if (!isNaN(v)) setBudget(v);
    setEditingBudget(false);
  }

  function addSpend() {
    const amt = parseFloat(spendAmount);
    if (!spendName.trim() || isNaN(amt) || amt <= 0) return;
    setSpends((prev) => [{
      id: Date.now().toString(), name: spendName.trim(), amount: amt,
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      category: spendCat,
    }, ...prev]);
    setSpendName(""); setSpendAmount(""); setSpendCat("other");
    setShowAddSpend(false);
  }

  function deleteSpend(id: string) { setSpends((prev) => prev.filter((s) => s.id !== id)); }

  function addFixed() {
    const amt = parseFloat(fixedAmount);
    if (!fixedName.trim() || isNaN(amt) || amt <= 0) return;
    setFixedExpenses((prev) => [...prev, { id: Date.now().toString(), name: fixedName.trim(), amount: amt, icon: "📋" }]);
    setFixedName(""); setFixedAmount(""); setShowAddFixed(false);
  }

  function deleteFixed(id: string) { setFixedExpenses((prev) => prev.filter((f) => f.id !== id)); }

  function saveFixedEdit(id: string) {
    const v = parseFloat(editFixedVal);
    if (isNaN(v)) return;
    setFixedExpenses((prev) => prev.map((f) => f.id === id ? { ...f, amount: v } : f));
    setEditingFixed(null);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white/30 text-sm">wertical</span>
          <span className="text-white/20">/</span>
          <span className="text-white/70 text-sm font-medium">finance</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/20 text-xs">{new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>
          {saved && <span className="text-emerald-400 text-xs bg-emerald-400/10 px-3 py-1 rounded-full">Saved</span>}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* ── SECTION 1: Available to spend ─────────────────────────────── */}
        <div className="mb-16">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Available to spend</p>

          {/* Budget edit (small, top right) */}
          <div className="flex justify-end mb-4">
            {editingBudget ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveBudget()}
                  className="bg-white/8 border border-white/15 rounded-lg px-3 py-1 text-white text-sm w-28 focus:outline-none focus:border-white/30 text-right"
                  autoFocus
                />
                <button onClick={saveBudget} className="text-emerald-400 text-xs">Save</button>
                <button onClick={() => setEditingBudget(false)} className="text-white/30 text-xs">✕</button>
              </div>
            ) : (
              <button onClick={() => { setBudgetInput(String(budget)); setEditingBudget(true); }} className="text-white/25 text-xs hover:text-white/50 transition-colors">
                Budget: {formatEUR(budget)} ✎
              </button>
            )}
          </div>

          {/* ── Vertical energy bar ── */}
          {(() => {
            const BAR_H      = 240;
            const BAR_W      = 48;
            const remainPct  = budget > 0 ? Math.max(freeToSpend / budget * 100, 0) : 0;
            const fixPct     = budget > 0 ? Math.min(totalFixed / budget * 100, 100) : 0;
            const spendColor = freeToSpend <= 0
              ? "#f87171"
              : freeToSpend < budget * 0.15 ? "#f87171"
              : freeToSpend < budget * 0.35 ? "#fb923c"
              : "#34d399";
            const remainH = BAR_H * remainPct / 100;
            const fixedH  = BAR_H * fixPct / 100;
            const ticks   = [75, 50, 25];

            return (
              <div className="flex gap-6 mb-6 items-start">

                {/* Left: numbers */}
                <div className="flex-1 flex flex-col justify-between" style={{ height: BAR_H + 20 }}>
                  {/* Big available number */}
                  <div>
                    <p className="text-white/30 text-xs mb-2">Available</p>
                    <p
                      className="font-bold tracking-tight leading-none mb-1"
                      style={{
                        fontSize: 52,
                        background: freeToSpend < 0 ? "linear-gradient(135deg,#f87171,#dc2626)" : "linear-gradient(135deg,#fff 0%,#aaa 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {formatEUR(freeToSpend)}
                    </p>
                    <p className="text-white/20 text-xs">of {formatEUR(budget)} budget</p>
                  </div>

                  {/* Breakdown */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/25 text-sm">Fixed</span>
                      <span className="text-orange-400/60 text-sm font-medium">{formatEUR(totalFixed)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/25 text-sm">Spent</span>
                      <span className="text-white/50 text-sm font-medium">{formatEUR(totalSpent)}</span>
                    </div>
                    <div className="h-px bg-white/6" />
                    <div className="flex items-center justify-between">
                      <span className="text-white/25 text-sm">Remaining</span>
                      <span className="text-sm font-semibold" style={{ color: spendColor }}>{formatEUR(freeToSpend)}</span>
                    </div>
                  </div>
                </div>

                {/* Right: vertical bar */}
                <div className="flex items-start gap-2 flex-shrink-0">
                  {/* Tick labels */}
                  <div className="relative flex flex-col justify-between text-right" style={{ height: BAR_H + 20 }}>
                    <span className="text-white/20 text-xs">{formatEUR(budget)}</span>
                    {ticks.map((t) => (
                      <span key={t} className="text-white/15 text-xs">{formatEUR(budget * t / 100)}</span>
                    ))}
                    <span className="text-white/15 text-xs">€0</span>
                  </div>

                  {/* Track */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-white/15 tracking-widest" style={{ fontSize: 8 }}>FULL</span>
                    <div className="relative rounded-2xl overflow-hidden" style={{ width: BAR_W, height: BAR_H, background: "rgba(255,255,255,0.05)" }}>

                      {/* Tick lines */}
                      {ticks.map((t) => (
                        <div key={t} className="absolute w-full pointer-events-none" style={{ top: `${100 - t}%`, height: 1, background: "rgba(255,255,255,0.08)" }} />
                      ))}

                      {/* Fixed strip */}
                      <div className="absolute bottom-0 left-0 w-full transition-all duration-700 ease-out"
                        style={{ height: fixedH, background: "linear-gradient(0deg,#c2410c99,#f9731655)" }} />

                      {/* Remaining fill */}
                      <div className="absolute left-0 w-full transition-all duration-700 ease-out"
                        style={{ bottom: fixedH, height: remainH, background: `linear-gradient(0deg,${spendColor}88,${spendColor}cc)` }} />

                      {/* Glow at fill level */}
                      {remainH > 0 && (
                        <div className="absolute left-0 w-full pointer-events-none transition-all duration-700 ease-out"
                          style={{ bottom: fixedH + remainH - 1, height: 2, background: spendColor, boxShadow: `0 0 12px 4px ${spendColor}88` }} />
                      )}

                      {/* ZERO */}
                      <div className="absolute bottom-1 left-0 w-full flex justify-center pointer-events-none">
                        <span className="text-white/20 font-medium tracking-widest" style={{ fontSize: 8 }}>ZERO</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })()}

          {/* Fixed expenses subsection */}
          <div className="rounded-2xl border border-white/6 bg-white/2 mb-3 overflow-hidden">
            <button
              onClick={() => setShowFixedPanel((v) => !v)}
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/3 transition-all"
            >
              <span className="text-white/35 text-xs flex items-center gap-2">
                <span>⚡</span> Fixed expenses · {formatEUR(totalFixed)}/mo
              </span>
              <span className="text-white/20 text-xs">{showFixedPanel ? "▲" : "▼"}</span>
            </button>
            {showFixedPanel && (
              <div className="px-4 pb-3 flex flex-col gap-1.5 border-t border-white/5">
                <div className="h-2" />
                {fixedExpenses.map((f) => (
                  <div key={f.id} className="flex items-center justify-between rounded-xl bg-white/4 px-3 py-2 group">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{f.icon}</span>
                      <span className="text-white/55 text-xs">{f.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {editingFixed === f.id ? (
                        <>
                          <input
                            type="number"
                            value={editFixedVal}
                            onChange={(e) => setEditFixedVal(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && saveFixedEdit(f.id)}
                            className="w-16 bg-white/8 border border-white/15 rounded-lg px-2 py-0.5 text-white text-xs focus:outline-none text-right"
                            autoFocus
                          />
                          <button onClick={() => saveFixedEdit(f.id)} className="text-emerald-400 text-xs">✓</button>
                          <button onClick={() => setEditingFixed(null)} className="text-white/30 text-xs">✕</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => { setEditingFixed(f.id); setEditFixedVal(String(f.amount)); }} className="text-white/40 text-xs font-medium hover:text-white/70 transition-colors">
                            {formatEUR(f.amount)}
                          </button>
                          <button onClick={() => deleteFixed(f.id)} className="text-white/10 hover:text-red-400 transition-colors text-xs opacity-0 group-hover:opacity-100">✕</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {showAddFixed ? (
                  <div className="rounded-xl bg-white/4 px-3 py-2.5 mt-1">
                    <div className="flex gap-2 mb-2">
                      <input type="text" placeholder="e.g. Rent, Netflix…" value={fixedName} onChange={(e) => setFixedName(e.target.value)}
                        className="flex-1 bg-white/6 border border-white/10 rounded-lg px-2.5 py-1.5 text-white/80 text-xs focus:outline-none placeholder:text-white/20" autoFocus />
                      <input type="number" placeholder="€0" value={fixedAmount} onChange={(e) => setFixedAmount(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addFixed()}
                        className="w-16 bg-white/6 border border-white/10 rounded-lg px-2.5 py-1.5 text-white/80 text-xs focus:outline-none text-right placeholder:text-white/20" />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={addFixed} className="flex-1 py-1.5 rounded-lg bg-white/10 text-white/60 text-xs hover:bg-white/15 transition-all">Add</button>
                      <button onClick={() => { setShowAddFixed(false); setFixedName(""); setFixedAmount(""); }} className="px-3 py-1.5 rounded-lg bg-white/4 text-white/25 text-xs">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowAddFixed(true)} className="text-white/20 text-xs hover:text-white/45 transition-colors mt-1 text-left">+ Add fixed expense</button>
                )}
              </div>
            )}
          </div>

          {/* Add spend button */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/25 text-xs">
              {spends.length > 0 ? `${spends.length} entr${spends.length === 1 ? "y" : "ies"} this month` : "No spendings logged yet"}
            </p>
            <button
              onClick={() => setShowAddSpend(true)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/6 text-white/50 hover:bg-white/10 hover:text-white/80 transition-all"
            >
              + Log spend
            </button>
          </div>

          {/* Add spend form */}
          {showAddSpend && (
            <div className="rounded-2xl border border-white/12 bg-white/4 p-4 mb-3">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">New spend</p>
              <div className="flex gap-2 mb-3">
                <input type="text" placeholder="What did you spend on?" value={spendName} onChange={(e) => setSpendName(e.target.value)}
                  className="flex-1 bg-white/6 border border-white/10 rounded-xl px-3 py-2.5 text-white/80 text-sm focus:outline-none focus:border-white/25 placeholder:text-white/20" autoFocus />
                <input type="number" placeholder="€0" value={spendAmount} onChange={(e) => setSpendAmount(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSpend()}
                  className="w-24 bg-white/6 border border-white/10 rounded-xl px-3 py-2.5 text-white/80 text-sm focus:outline-none focus:border-white/25 placeholder:text-white/20" />
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(Object.entries(SPEND_CATEGORIES) as [SpendCategory, typeof SPEND_CATEGORIES[SpendCategory]][]).map(([key, c]) => (
                  <button key={key} onClick={() => setSpendCat(key)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all"
                    style={{
                      background: spendCat === key ? `${c.color}25` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${spendCat === key ? c.color + "60" : "rgba(255,255,255,0.08)"}`,
                      color: spendCat === key ? c.color : "rgba(255,255,255,0.35)",
                    }}
                  >
                    <span>{c.icon}</span><span>{c.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={addSpend} className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/80 text-sm font-medium hover:bg-white/15 transition-all">Add</button>
                <button onClick={() => { setShowAddSpend(false); setSpendName(""); setSpendAmount(""); setSpendCat("other"); }}
                  className="px-4 py-2.5 rounded-xl bg-white/4 text-white/30 text-sm hover:bg-white/8 transition-all">Cancel</button>
              </div>
            </div>
          )}

          {/* Category filter pills */}
          {categoryTotals.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categoryTotals.map(([cat, amt]) => {
                const c = SPEND_CATEGORIES[cat as SpendCategory];
                return (
                  <button key={cat} onClick={() => setFilterCat(filterCat === cat ? "all" : cat as SpendCategory)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-all"
                    style={{
                      background: filterCat === cat ? `${c.color}25` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${filterCat === cat ? c.color + "50" : "rgba(255,255,255,0.06)"}`,
                      color: filterCat === cat ? c.color : "rgba(255,255,255,0.45)",
                    }}
                  >
                    <span>{c.icon}</span><span>{c.label}</span><span className="font-medium">{formatEUR(amt)}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Spend list */}
          {filteredSpends.length > 0 && (
            <div className="flex flex-col gap-2">
              {filteredSpends.map((entry) => {
                const c = SPEND_CATEGORIES[entry.category];
                return (
                  <div key={entry.id} className="flex items-center justify-between rounded-xl border border-white/6 bg-white/2 px-4 py-3 group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ background: `${c.color}18` }}>
                        {c.icon}
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-medium">{entry.name}</p>
                        <p className="text-white/25 text-xs">{c.label} · {entry.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/60 text-sm font-semibold">−{formatEUR(entry.amount)}</span>
                      <button onClick={() => deleteSpend(entry.id)} className="text-white/15 hover:text-red-400 transition-colors text-xs opacity-0 group-hover:opacity-100">✕</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── SECTION 2: Total Wealth ───────────────────────────────────── */}
        <div>
          <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Total wealth</p>

          {/* Hero number */}
          <div className="mb-2">
            <h2
              className="text-5xl font-bold tracking-tight"
              style={{ background: "linear-gradient(135deg, #fff 0%, #555 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              {formatEUR(realWealth)}
            </h2>
          </div>

          {/* Explanation line */}
          <div className="flex items-center gap-2 text-xs text-white/25 mb-8">
            <span>{formatEUR(accountsTotal)} across accounts</span>
            <span>−</span>
            <span>{formatEUR(totalOutgoing)} outgoings this month</span>
          </div>

          {/* Account category bar */}
          <div className="flex rounded-full overflow-hidden h-1.5 mb-4 gap-0.5">
            {accountCategoryTotals.map(({ category, total: catTotal, color }) => (
              <div key={category} style={{ width: `${(catTotal / accountsTotal) * 100}%`, background: color, minWidth: 4 }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            {accountCategoryTotals.map(({ category, total: catTotal, color }) => (
              <div key={category} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-white/35 text-xs">{categoryLabel[category]}</span>
                <span className="text-white/55 text-xs font-medium">{formatEUR(catTotal)}</span>
              </div>
            ))}
          </div>

          {/* Account cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {accounts.map((account) => {
              const pct = ((account.balance / accountsTotal) * 100).toFixed(1);
              return (
                <button key={account.id} onClick={() => openAccount(account)}
                  className="text-left rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-200 p-5 group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: `${account.color}18` }}>
                        {account.icon}
                      </div>
                      <div>
                        <p className="font-medium text-white/90 text-sm">{account.name}</p>
                        <p className="text-white/30 text-xs mt-0.5">{categoryLabel[account.category]}</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${account.color}18`, color: account.color }}>
                      {pct}%
                    </span>
                  </div>
                  <p className="text-2xl font-semibold tracking-tight" style={{ color: account.color }}>
                    {formatEUR(account.balance)}
                  </p>
                  <div className="mt-3 h-0.5 rounded-full bg-white/5">
                    <div className="h-full rounded-full" style={{ width: `${(account.balance / accountsTotal) * 100}%`, background: account.color, opacity: 0.5 }} />
                  </div>
                  <p className="text-white/20 text-xs mt-2 group-hover:text-white/40 transition-colors">Tap to view details →</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── SECTION 3: Monthly Statistics ────────────────────────────── */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Monthly statistics</p>
              <p className="text-white/20 text-xs">Saved automatically each month</p>
            </div>
            {monthlyStats.length > 0 && (
              <span className="text-white/20 text-xs">{monthlyStats.length} month{monthlyStats.length !== 1 ? "s" : ""} recorded</span>
            )}
          </div>

          {monthlyStats.length === 0 ? (
            <div className="rounded-2xl border border-white/6 bg-white/2 px-6 py-10 text-center">
              <p className="text-3xl mb-3">📅</p>
              <p className="text-white/35 text-sm font-medium mb-1">No history yet</p>
              <p className="text-white/20 text-xs">At the end of each month, a snapshot is saved automatically. Come back in May to see April here.</p>
            </div>
          ) : (
            <>
              {/* Bar chart — all months */}
              {(() => {
                const maxTotal = Math.max(...monthlyStats.map((m) => m.budget));
                const months   = [...monthlyStats].sort((a, b) => a.month.localeCompare(b.month));
                return (
                  <div className="rounded-2xl border border-white/8 bg-white/2 p-5 mb-4">
                    <div className="flex items-end gap-2 h-32">
                      {months.map((m) => {
                        const totalUsed  = m.totalFixed + m.totalSpent;
                        const savedAmt   = m.budget - totalUsed;
                        const fixedH     = (m.totalFixed / maxTotal) * 100;
                        const spentH     = (m.totalSpent / maxTotal) * 100;
                        const isSelected = selectedMonth === m.month;
                        const overBudget = totalUsed > m.budget;
                        return (
                          <button
                            key={m.month}
                            onClick={() => setSelectedMonth(isSelected ? null : m.month)}
                            className="flex-1 flex flex-col items-center gap-1 group"
                          >
                            <div className="w-full flex flex-col justify-end rounded-lg overflow-hidden transition-all"
                              style={{
                                height: 96,
                                background: "rgba(255,255,255,0.04)",
                                outline: isSelected ? "1px solid rgba(255,255,255,0.2)" : "none",
                              }}
                            >
                              {/* Spent bar */}
                              <div style={{ height: `${spentH}%`, background: overBudget ? "#f87171" : "#34d39988", transition: "height 0.6s ease" }} />
                              {/* Fixed bar */}
                              <div style={{ height: `${fixedH}%`, background: "#f9731666", transition: "height 0.6s ease" }} />
                            </div>
                            <span className="text-white/30 text-xs group-hover:text-white/55 transition-colors" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : undefined }}>
                              {m.label.split(" ")[0].slice(0, 3)}
                            </span>
                            <span className={`text-xs font-medium ${savedAmt >= 0 ? "text-emerald-400/70" : "text-red-400/70"}`}>
                              {savedAmt >= 0 ? "+" : ""}{formatEUR(savedAmt)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
                      <span className="flex items-center gap-1.5 text-white/25 text-xs">
                        <span className="w-2 h-2 rounded-sm" style={{ background: "#f9731666" }} />Fixed
                      </span>
                      <span className="flex items-center gap-1.5 text-white/25 text-xs">
                        <span className="w-2 h-2 rounded-sm bg-emerald-400/50" />Spent
                      </span>
                      <span className="text-white/15 text-xs ml-auto">Click a bar to expand</span>
                    </div>
                  </div>
                );
              })()}

              {/* Selected month detail */}
              {selectedMonth && (() => {
                const m = monthlyStats.find((s) => s.month === selectedMonth);
                if (!m) return null;
                const totalUsed = m.totalFixed + m.totalSpent;
                const saved     = m.budget - totalUsed;
                const cats      = Object.entries(m.categories).sort((a, b) => b[1] - a[1]);
                return (
                  <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white/80 font-semibold">{m.label}</h3>
                      <button onClick={() => setSelectedMonth(null)} className="text-white/25 hover:text-white/50 text-xs">✕</button>
                    </div>

                    {/* Summary row */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: "Budget",   value: formatEUR(m.budget),      color: "text-white/70" },
                        { label: "Spent",    value: formatEUR(totalUsed),     color: "text-white/70" },
                        { label: saved >= 0 ? "Saved" : "Over", value: formatEUR(Math.abs(saved)), color: saved >= 0 ? "text-emerald-400" : "text-red-400" },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="bg-white/4 rounded-xl p-3 text-center">
                          <p className="text-white/30 text-xs mb-1">{label}</p>
                          <p className={`text-sm font-semibold ${color}`}>{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Category breakdown */}
                    {cats.length > 0 && (
                      <>
                        <p className="text-white/25 text-xs uppercase tracking-widest mb-3">Breakdown</p>
                        <div className="flex flex-col gap-2">
                          {cats.map(([cat, amt]) => {
                            const c    = SPEND_CATEGORIES[cat as SpendCategory];
                            const pct  = m.totalSpent > 0 ? (amt / m.totalSpent) * 100 : 0;
                            return (
                              <div key={cat}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-white/55 text-xs flex items-center gap-1.5">
                                    <span>{c.icon}</span>{c.label}
                                  </span>
                                  <span className="text-white/55 text-xs font-medium">{formatEUR(amt)}</span>
                                </div>
                                <div className="h-1 rounded-full bg-white/6 overflow-hidden">
                                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: c.color, opacity: 0.7 }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                );
              })()}

              {/* Year summary if 2+ months */}
              {monthlyStats.length >= 2 && (() => {
                const yearSpent  = monthlyStats.reduce((s, m) => s + m.totalFixed + m.totalSpent, 0);
                const yearBudget = monthlyStats.reduce((s, m) => s + m.budget, 0);
                const yearSaved  = yearBudget - yearSpent;
                const avgMonthly = yearSpent / monthlyStats.length;
                return (
                  <div className="mt-4 rounded-2xl border border-white/6 bg-white/2 p-4">
                    <p className="text-white/25 text-xs uppercase tracking-widest mb-3">Year so far</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Total spent",   value: formatEUR(yearSpent) },
                        { label: "Avg / month",   value: formatEUR(avgMonthly) },
                        { label: yearSaved >= 0 ? "Total saved" : "Total over", value: formatEUR(Math.abs(yearSaved)), highlight: yearSaved >= 0 },
                      ].map(({ label, value, highlight }) => (
                        <div key={label} className="text-center">
                          <p className="text-white/25 text-xs mb-1">{label}</p>
                          <p className={`text-sm font-semibold ${highlight === true ? "text-emerald-400" : highlight === false ? "text-red-400" : "text-white/65"}`}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </div>

      </div>

      {/* ── Account Modal ─────────────────────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111] p-7 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-5 right-5 text-white/30 hover:text-white/70 transition-colors text-lg">✕</button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${selected.color}20` }}>
                {selected.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{selected.name}</h2>
                <p className="text-white/40 text-sm">{categoryLabel[selected.category]}</p>
              </div>
            </div>

            {editing ? (
              <div className="mb-6">
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Balance (EUR)</label>
                <input type="number" value={editValue} onChange={(e) => setEditValue(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-2xl font-semibold focus:outline-none focus:border-white/30 mb-3" autoFocus />
                <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Description</label>
                <input type="text" value={editDesc} onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 text-sm focus:outline-none focus:border-white/30" />
              </div>
            ) : (
              <div className="mb-6">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-1">Balance</p>
                <p className="text-4xl font-bold tracking-tight mb-2" style={{ color: selected.color }}>{formatEUR(selected.balance)}</p>
                <p className="text-white/40 text-sm">{selected.description}</p>
              </div>
            )}

            {selected.breakdown && !editing && (
              <div className="mb-6">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Breakdown</p>
                <div className="flex flex-col gap-2">
                  {selected.breakdown.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white/4 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <div>
                          <p className="text-white/80 text-sm font-medium">{item.name}</p>
                          <p className="text-white/30 text-xs">{item.description}</p>
                        </div>
                      </div>
                      <span className="text-white/70 text-sm font-semibold">{formatEUR(item.balance)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/4 rounded-2xl p-4">
                <p className="text-white/30 text-xs mb-1">% of total</p>
                <p className="text-white/80 font-semibold">{((selected.balance / accountsTotal) * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-white/4 rounded-2xl p-4">
                <p className="text-white/30 text-xs mb-1">Currency</p>
                <p className="text-white/80 font-semibold">{selected.currency}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {editing ? (
                <>
                  <button onClick={saveEdit} className="flex-1 py-3 rounded-xl font-medium text-sm" style={{ background: selected.color, color: "#000" }}>Save changes</button>
                  <button onClick={() => setEditing(false)} className="px-5 py-3 rounded-xl bg-white/6 text-white/50 text-sm hover:bg-white/10">Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} className="flex-1 py-3 rounded-xl bg-white/6 text-white/70 text-sm hover:bg-white/10 font-medium">Edit balance</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
